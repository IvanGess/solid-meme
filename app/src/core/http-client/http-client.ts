import type {
  ErrorResponse,
  HTTPMethod,
  ServiceResult,
  AsyncServiceResult,
} from '@/core/http-client/interfaces/http-client.interfaces';
import { HttpError } from '@/core/http-client/http-error';

const DEFAULT_BASE_URL = 'https://dist.nd.ru';

export class HttpClient {
  constructor(private baseUrl: string = DEFAULT_BASE_URL) {}

  public get<T>(
    path: string,
    isAuthRequired: boolean = true
  ): AsyncServiceResult<T> {
    return this._request<T>('GET', path, undefined, isAuthRequired);
  }

  public post<T>(
    path: string,
    data?: unknown,
    isAuthRequired: boolean = true
  ): AsyncServiceResult<T> {
    return this._request<T>('POST', path, data, isAuthRequired);
  }

  public put<T>(
    path: string,
    data?: unknown,
    isAuthRequired: boolean = true
  ): AsyncServiceResult<T> {
    return this._request<T>('PUT', path, data, isAuthRequired);
  }

  public patch<T>(
    path: string,
    data?: unknown,
    isAuthRequired: boolean = true
  ): AsyncServiceResult<T> {
    return this._request<T>('PATCH', path, data, isAuthRequired);
  }

  public delete<T>(
    path: string,
    isAuthRequired: boolean = true
  ): AsyncServiceResult<T> {
    return this._request<T>('DELETE', path, undefined, isAuthRequired);
  }

  private async _request<T>(
    method: HTTPMethod,
    path: string,
    data?: unknown,
    isAuthRequired: boolean = true
  ): Promise<ServiceResult<T>> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: this._prepareHeaders(isAuthRequired),
      body: data ? JSON.stringify(data) : undefined,
    }).catch((error) => ({
      error: this._normalizeError(error).error!,
    }));

    if (response instanceof Response) {
      if (!response.ok) {
        return { error: await this._handleError(response) };
      }

      const responseData =
        response.status === 204
          ? null
          : await response.json().catch(() => null);

      return { data: responseData as T };
    }

    return { error: response.error };
  }

  private _prepareHeaders(isAuthRequired: boolean): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (isAuthRequired) {
      const token = this._getAuthToken();
      if (token) headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  private async _handleError(response: Response): Promise<HttpError> {
    try {
      const errorData: ErrorResponse = await response.json();
      return new HttpError(
        errorData.statusCode,
        errorData.error,
        this._normalizeErrorMessage(errorData.message),
        response
      );
    } catch {
      return new HttpError(
        response.status,
        'UnknownError',
        ['Неизвестная ошибка'],
        response
      );
    }
  }

  private _normalizeErrorMessage(message: string | string[]): string[] {
    return Array.isArray(message) ? message : [message];
  }

  private _normalizeError(error: unknown): ServiceResult<never> {
    if (error instanceof HttpError) {
      return { error };
    }
    return {
      error: new HttpError(500, 'Ошибка сети', ['Запрос был неуспешным']),
    };
  }

  private _getAuthToken(): string | null {
    try {
      return localStorage.getItem('accessToken');
    } catch {
      return null;
    }
  }
}

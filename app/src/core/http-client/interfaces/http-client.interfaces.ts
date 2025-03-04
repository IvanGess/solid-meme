import type { HttpError } from '@/core/http-client/http-error.ts'

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type ErrorResponse = {
  message: string | string[]
  statusCode: number
  error: string
}
export type ServiceResult<T> = {
  data?: T
  error?: HttpError
}

export type AsyncServiceResult<T> = Promise<ServiceResult<T>>;

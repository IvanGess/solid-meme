export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly errorCode: string,
    public readonly messages: string[],
    public readonly response?: Response
  ) {
    super(messages.join(', '));
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

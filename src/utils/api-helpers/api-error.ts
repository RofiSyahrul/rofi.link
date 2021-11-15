import StatusCode from '@/constants/status-code';

export default class ApiError extends Error {
  private _statusCode: number;

  constructor(message: string, statusCode = StatusCode.BadRequest) {
    super(message);
    this._statusCode = statusCode;
  }

  public get statusCode(): number {
    return this._statusCode;
  }
}

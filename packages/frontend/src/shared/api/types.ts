export type ApiErrorObject = {
  status: number;
  code: string;
  title: string;
  detail?: string;
  trace_id?: string;
};

export type ApiErrorResponse = {
  errors: ApiErrorObject[];
};

export type ApiListResponse<T> = {
  data: T[];
  meta?: {
    limit?: number;
    offset?: number;
    total?: number;
  };
};

export type ApiResourceResponse<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

export class HttpError extends Error {
  status: number;
  code?: string;
  traceId?: string;

  constructor(message: string, options: { status: number; code?: string; traceId?: string }) {
    super(message);
    this.name = 'HttpError';
    this.status = options.status;
    this.code = options.code;
    this.traceId = options.traceId;
  }
}

export interface DefaultResponseBody<T> extends NoDataResponseBody {
  data: T;
}

export interface NoDataResponseBody {
  status: string;
  message: string;
}

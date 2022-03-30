// eslint-disable-next-line no-shadow
export enum APIErrorCode {
  unknown
}
export interface APIResponse<T> {
  success: boolean;
  errorCode?: APIErrorCode;
  errorMessage?: string;
  data: T;
}
export interface PageResponse<T> {
  total: number;
  current: number;
  list: T[];
  pageSize: number;
}

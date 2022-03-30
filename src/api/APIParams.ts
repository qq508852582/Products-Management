export interface KeyValue {
  [key: string]: string | number | boolean | undefined;
}

export interface PageParam extends KeyValue {
  current?: number;
  pageSize?: number;
}

import { APIResponse } from '@/api/APIResponse';
import { KeyValue } from '@/api/APIParams';
import axios, { AxiosRequestConfig } from 'axios';

export const paramsUrl = (path: string, params?: KeyValue) => (
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ((params == null || Object.values(params!).every((v) => v == null)))
    ? path
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    : `${path}?${Object.keys(params!)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .filter((k) => params![k] != null)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map((k) => `${k}=${params![k]}`)
      .join('&')}`);

// eslint-disable-next-line import/prefer-default-export
export const jsonRequest = <T>(path: string, params?: KeyValue, config?: AxiosRequestConfig): Promise<T> => new Promise<T>(((resolve, reject) => {
  // axios.request(`/api/${paramsUrl(path, params)}`, init)
  axios.request({
    baseURL: '/api',
    url: `${paramsUrl(path, params)}`,
    ...config,
  })
    .then((response) => (response.status === 200 ? response.data : Promise.reject(response)))
    .then((data) => Promise.resolve(JSON.parse(data)))
    .then((json: APIResponse<T>) => (json.success ? Promise.resolve(json.data) : Promise.reject(json)))
    .then((data: T) => {
      resolve(data);
    })
    .catch((e) => {
      reject(e);
    });
}));

import { PageParam } from '@/api/APIParams';
import { jsonRequest } from '@/api';
import './products.mock';
import { PageResponse } from '@/api/APIResponse';

export interface ProductsParams extends PageParam {
  name?: string;
  // ...some other query params
}

export interface Product {
  id?: number;
  name?: string;
  price?: number;
}

export const products = (params?: ProductsParams) => jsonRequest<PageResponse<Product>>('/products', params);
export const product = (id: number | string) => jsonRequest<Product>(`/products/${id}`);
export const deleteProduct = (id: number | string) => jsonRequest<Product>(`/products/${id}`, undefined, { method: 'delete' });
export const saveProduct = (data: Product) => jsonRequest<Product>('/products', undefined, { data, method: 'put' });

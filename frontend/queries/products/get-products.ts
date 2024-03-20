import { Product } from '@/queries/products/types';

export interface GetProductsResponse {
  products: Product[];
}

export async function getProducts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
    {
      method: 'GET',
    }
  );

  if (!response.ok) {
    const data: { message: string } = await response.json();

    if (response.status === 400) {
      throw new Error(data.message);
    }

    throw new Error(data.message || 'An error occurred');
  }
  const data: GetProductsResponse = await response.json();
  return data;
}

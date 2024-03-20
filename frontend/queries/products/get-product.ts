import { Product } from '@/queries/products/types';

export async function getProduct({ id }: { id: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`,
    {
      method: 'GET',
    }
  );

  if (!response.ok) {
    const data: { detail: string } = await response.json();
    console.error(data);
    throw new Error(data.detail || 'An error occurred');
  }
  const data: Product = await response.json();
  return data;
}

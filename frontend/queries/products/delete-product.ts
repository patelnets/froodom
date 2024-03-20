import { Product } from '@/queries/products/types';

export async function deleteProduct({
  id,
  token,
}: {
  id: Product['id'];
  token: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    }
  );

  if (!response.ok) {
    const data: { message: string } = await response.json();
    console.error(data);
    throw new Error(data.message || 'An error occurred');
  }
  return await response.json();
}

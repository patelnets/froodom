import { Product } from '@/queries/products/types';

export async function editProduct({
  data,
  token,
}: {
  data: {
    name: Product['name'];
    stores: Product['stores'];
    id: Product['id'];
    categories: Product['categories'];
  };
  token: string;
}) {
  const { id, ...body } = data;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const data: { message: string } = await response.json();

    if (response.status === 400) {
      throw new Error(data.message);
    }

    throw new Error(data.message || 'An error occurred');
  }
  return await response.json();
}

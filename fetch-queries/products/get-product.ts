interface Response {
  id: string;
  name: string;
  stores: string[];
}

export async function getProduct({ id }: { id: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${id}`,
    {
      method: 'GET',
    }
  );

  if (!response.ok) {
    const data: { message: string } = await response.json();
    console.error(data);
    throw new Error(data.message || 'An error occurred');
  }
  const data: Response = await response.json();
  return data;
}

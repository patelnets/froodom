export async function addProduct({
  data,
  token,
}: {
  data: { name: string; stores: string[] };
  token: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
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

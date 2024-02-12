export async function getProducts() {
  const response = await fetch(
    `https://8b0z64x58c.execute-api.eu-west-2.amazonaws.com/prod/products`,
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
  const data = await response.json();
  return data;
}

export async function addProduct(data: { name: string; stores: string[] }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
  const resData = await response.json();
  return resData;
}

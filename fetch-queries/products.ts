interface GetProductsResponse {
  products: [
    {
      id: string;
      name: string;
      stores: string[];
    },
  ];
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
  const resData = await response.json();
  return resData;
}
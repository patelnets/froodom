interface Response {
  id: string;
  name: string;
  stores: string[];
}

export async function postImages({
  id,
  files,
  token,
}: {
  id: string;
  files: FormData;
  token: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}/images`,
    {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: files,
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

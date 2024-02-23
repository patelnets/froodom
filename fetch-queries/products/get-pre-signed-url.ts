export interface PreSignedUrlResponse {
  url: string;
}

export async function getPreSignedUrl({
  id,
  token,
}: {
  id: string;
  token: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}/image-upload-pre-signed-url`,
    {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    }
  );

  if (!response.ok) {
    const data: { detail: string } = await response.json();
    console.error(data);
    throw new Error(data.detail || 'An error occurred');
  }
  const data: PreSignedUrlResponse = await response.json();
  return data;
}

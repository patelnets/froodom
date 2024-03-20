import { Product } from '@/queries/products/types';

export async function postImageUsingPreSignedUrl({
  url,
  file,
}: {
  url: string;
  file: File;
}) {
  const response = await fetch(url, {
    method: 'PUT',
    body: file,
  });

  if (!response.ok) {
    const data: { message: string } = await response.json();
    console.error(data);
    throw new Error(data.message || 'An error occurred');
  }
  return;
}

export async function getPreSignedUrl({
  id,
  token,
}: {
  id: Product['id'];
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
  const data: {
    url: string;
  } = await response.json();
  return data;
}

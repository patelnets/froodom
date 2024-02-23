interface Response {
  id: string;
  name: string;
  stores: string[];
}

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

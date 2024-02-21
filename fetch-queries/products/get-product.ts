export interface Store {
  value: string;
  displayName: string;
}

export const STORES: Store[] = [
  {
    value: 'asda',
    displayName: 'Asda',
  },
  {
    value: 'tesco',
    displayName: 'Tesco',
  },
  {
    value: 'sainsburys',
    displayName: 'Sainsbury’s',
  },
  {
    value: 'morrisons',
    displayName: 'Morrisons',
  },
  {
    value: 'mands',
    displayName: 'M and S',
  },
  {
    value: 'aldi',
    displayName: 'Aldi',
  },
  {
    value: 'lidl',
    displayName: 'Lidl',
  },
  {
    value: 'amazon',
    displayName: 'Amazon',
  },
  {
    value: 'hollandAndBarrett',
    displayName: 'Holland and Barrett',
  },
];

interface Response {
  id: string;
  name: string;
  stores: string[];
  image_urls: Record<string, string>;
  header_image: string;
}

export async function getProduct({ id }: { id: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`,
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

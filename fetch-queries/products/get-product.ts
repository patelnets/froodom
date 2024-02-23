export interface Store {
  value: string;
  displayName: string;
}

export const STORES: Store[] = [
  {
    value: 'aldi',
    displayName: 'Aldi',
  },
  {
    value: 'amazon',
    displayName: 'Amazon',
  },
  {
    value: 'asda',
    displayName: 'Asda',
  },
  {
    value: 'hollandAndBarrett',
    displayName: 'Holland & Barrett',
  },
  {
    value: 'lidl',
    displayName: 'Lidl',
  },
  {
    value: 'mands',
    displayName: 'M&S',
  },
  {
    value: 'morrisons',
    displayName: 'Morrisons',
  },
  {
    value: 'sainsburys',
    displayName: 'Sainsbury’s',
  },
  {
    value: 'tesco',
    displayName: 'Tesco',
  },
  {
    value: 'waitrose',
    displayName: 'Waitrose',
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
    const data: { detail: string } = await response.json();
    console.error(data);
    throw new Error(data.detail || 'An error occurred');
  }
  const data: Response = await response.json();
  return data;
}

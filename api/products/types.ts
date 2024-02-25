export interface Store {
  value: string;
  displayName: string;
}

export type Product = {
  id: string;
  name: string;
  stores: string[];
  image_urls: Record<string, string>;
  header_image: string;
};

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

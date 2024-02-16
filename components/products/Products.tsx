'use client';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { Cards } from '@/components/cards/Cards';

import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/fetch-queries/products';

export const Products = ({ products }: { products: any }) => {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    initialData: products,
  });

  return <Cards products={data.products} />;
};

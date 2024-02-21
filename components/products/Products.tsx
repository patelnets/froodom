'use client';
import { Select, SelectItem } from '@nextui-org/react';
import { Cards } from '@/components/cards/Cards';

import { useQuery } from '@tanstack/react-query';
import { getProducts, GetProductsResponse } from '@/fetch-queries/products';
import { STORES } from '@/fetch-queries/products/get-product';
import { useMemo, useState } from 'react';

const getFilteredProducts = (
  allProducts: GetProductsResponse['products'],
  selectedStores: string[]
) => {
  const products: GetProductsResponse['products'] = [];
  if (selectedStores.includes('all') || !selectedStores.length) {
    return allProducts;
  } else {
    for (const product of allProducts) {
      if (product.stores.some((store) => selectedStores.includes(store))) {
        products.push(product);
      }
    }
    return products;
  }
};

export const Products = ({ products }: { products: GetProductsResponse }) => {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    initialData: products,
  });

  const [selectedStores, setSelectedStores] = useState<string[]>([]);

  // TODO: figure out a better way of doing this, it will start to be a bottleneck at scale
  const filteredProducts = useMemo(
    () => getFilteredProducts(data.products, selectedStores),
    [data.products, selectedStores]
  );

  return (
    <div className={'flex flex-col gap-4'}>
      <Select
        label='Select a store'
        placeholder='Select an animal'
        defaultSelectedKeys={['all']}
        // selectionMode='multiple'
        className='max-w-xs'
        onChange={(event) => {
          // split up the text by comma and remove any whitespace and save to state
          setSelectedStores(
            event.target.value.split(',').map((store) => store.trim())
          );
        }}
      >
        {[{ value: 'all', displayName: 'All stores' }, ...STORES].map(
          (store) => (
            <SelectItem key={store.value} value={store.value}>
              {store.displayName}
            </SelectItem>
          )
        )}
      </Select>

      <Cards products={filteredProducts} />
    </div>
  );
};

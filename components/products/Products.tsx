'use client';
import { Select, SelectItem } from '@nextui-org/react';
import { Cards } from '@/components/cards/Cards';

import { useQuery } from '@tanstack/react-query';
import { getProducts, Product, STORES } from '@/api/products';
import { useMemo, useState } from 'react';

const getFilteredProducts = (
  allProducts: Product[],
  selectedStores: string[]
) => {
  const products: Product[] = [];
  if (selectedStores.includes('all') || selectedStores.length == 0) {
    return allProducts;
  } else {
    for (const product of allProducts.slice(10)) {
      if (product.stores.some((store) => store === selectedStores[0])) {
        products.push(product);
      }
    }
    return products;
  }
};

export const Products = ({
  products,
}: {
  products: Awaited<ReturnType<typeof getProducts>>;
}) => {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    initialData: products,
  });

  const [selectedStores, setSelectedStores] = useState<string[]>(['all']);
  // TODO: figure out a better way of doing this, it will start to be a bottleneck at scale
  const filteredProducts = useMemo(
    () => getFilteredProducts(data.products, selectedStores),
    [data.products, JSON.stringify(selectedStores)]
  );

  return (
    <div className={'flex flex-col gap-4 w-full'}>
      <Select
        label='Select a store'
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

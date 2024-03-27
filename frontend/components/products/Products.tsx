'use client';
import { Select, SelectItem } from '@nextui-org/react';
import { ProductCards } from '@/components/products/ProductCards';

import { useQuery } from '@tanstack/react-query';
import {
  getProducts,
  Product,
  STORES,
  PRIMARY_CATEGORIES,
} from '@/queries/products';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import ShoppingBagLogo from '../../public/images/stores/shopping-bag.webp';

const getFilteredProducts = (
  allProducts: Product[],
  selectedStores: string[],
  selectedCategories: string[]
) => {
  let allProductsFiltered = [...allProducts];
  if (selectedCategories.length > 0 && !selectedCategories.includes('all')) {
    allProductsFiltered = allProductsFiltered.filter((product) =>
      product.categories.some((category) =>
        selectedCategories.includes(category)
      )
    );
  }

  if (selectedStores.length > 0 && !selectedStores.includes('all')) {
    allProductsFiltered = allProductsFiltered.filter((product) =>
      product.stores.some((store) => store === selectedStores[0])
    );
  }

  return allProductsFiltered;
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'all',
  ]);
  // TODO: figure out a better way of doing this, it will start to be a bottleneck at scale
  const filteredProducts = useMemo(
    () =>
      getFilteredProducts(data.products, selectedStores, selectedCategories),
    [data.products, selectedStores, selectedCategories]
  );

  return (
    <div className={'flex flex-col gap-4 w-full'}>
      <div className={'flex flex-col gap-2 sm:flex-row'}>
        <Select
          label='Select a store'
          defaultSelectedKeys={['all']}
          className='max-w-xs'
          onChange={(event) => {
            setSelectedStores(
              event.target.value.split(',').map((store) => store.trim())
            );
          }}
        >
          {[
            { value: 'all', displayName: 'All stores', logo: ShoppingBagLogo },
            ...STORES,
          ].map((store) => (
            <SelectItem
              textValue={store.displayName}
              key={store.value}
              value={store.value}
            >
              <div className={'flex justify-between'}>
                <p>{store.displayName}</p>
                <Image src={store.logo} alt={store.displayName} width={20} />
              </div>
            </SelectItem>
          ))}
        </Select>

        <Select
          label='Select a category'
          defaultSelectedKeys={['all']}
          className='max-w-xs'
          selectionMode='multiple'
          onChange={(event) => {
            setSelectedCategories(
              event.target.value.split(',').map((store) => store.trim())
            );
          }}
        >
          {[
            {
              value: 'all',
              displayName: 'All categories',
            },
            ...PRIMARY_CATEGORIES,
          ].map(({ displayName, value }) => (
            <SelectItem textValue={displayName} key={value} value={value}>
              <div className={'flex justify-between'}>
                <p>{displayName}</p>
              </div>
            </SelectItem>
          ))}
        </Select>
      </div>
      <ProductCards products={filteredProducts} />
    </div>
  );
};

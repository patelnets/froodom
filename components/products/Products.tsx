'use client';
import { Select, SelectItem } from '@nextui-org/react';
import { ProductCards } from '@/components/products/ProductCards';

import { useQuery } from '@tanstack/react-query';
import { getProducts, Product, STORES } from '@/api/products';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import ShoppingBagLogo from '../../public/images/stores/shopping-bag.webp';

const getFilteredProducts = (
  allProducts: Product[],
  selectedStores: string[]
) => {
  if (selectedStores.includes('all') || selectedStores.length == 0) {
    return allProducts;
  } else {
    return allProducts.filter((product) =>
      product.stores.some((store) => store === selectedStores[0])
    );
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

      <ProductCards products={filteredProducts} />
    </div>
  );
};

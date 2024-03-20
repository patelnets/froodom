import Image from 'next/image';
import React from 'react';
import { STORES, type Product as IProduct } from '@/queries/products';

interface Props {
  product: IProduct;
}
export const Product = ({ product }: Props) => {
  return (
    <div className={'flex gap-2 flex-col justify-center items-center'}>
      <h1 className={'text-2xl'}> {product.name} </h1>
      <div className={'relative w-full h-[40vh] rounded-lg overflow-hidden'}>
        {product.header_image ? (
          <Image
            alt={product.name}
            className='w-full object-contain'
            src={product.header_image}
            fill={true}
          />
        ) : (
          <div className='w-full h-full bg-gray-300 p-4 flex justify-center items-center'>
            <p>Image coming soon!</p>
          </div>
        )}
      </div>
      <h2 className={'text-xl mt-2'}>Available at</h2>
      <ul>
        {product.stores.map((store) => (
          <li key={store}>
            {STORES.find(({ value }) => value === store)?.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
};

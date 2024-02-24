import React from 'react';
import Image from 'next/image';
import { Link } from '@nextui-org/link';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { GetProductsResponse } from '@/fetch-queries/products';

export const Cards = ({
  products,
}: {
  products: GetProductsResponse['products'];
}) => {
  return (
    <div className='gap-2 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6'>
      {products.map(({ name, id, stores, header_image }, index) => (
        <Link className={'w-full'} key={id} href={`/products/${id}`}>
          <Card
            className={'bg-light-cream w-full'}
            shadow='sm'
            isPressable
            onPress={() => console.log('item pressed', name)}
          >
            <CardBody className='w-full overflow-visible p-0 relative h-[200px]'>
              {header_image ? (
                <Image
                  alt={name}
                  fill={true}
                  className='object-cover'
                  src={header_image}
                />
              ) : (
                <div className='w-full h-full bg-gray-300 p-4 flex justify-center items-center'>
                  <p>Image coming soon!</p>
                </div>
              )}
            </CardBody>
            <CardFooter className='text-small justify-between'>
              <b className={'text-ellipsis whitespace-nowrap overflow-hidden'}>
                {name}
              </b>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

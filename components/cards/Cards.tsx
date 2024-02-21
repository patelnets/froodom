import React from 'react';
import { Card, CardBody, CardFooter, Image, Link } from '@nextui-org/react';

interface Product {
  id: string;
  name: string;
  stores: string[];
}
export const Cards = ({ products }: { products: Product[] }) => {
  return (
    <div className='gap-2 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6'>
      {products.map(({ name, id, stores }, index) => (
        <Link className={'w-fit'} key={id} href={`/product/${id}`}>
          <Card
            className={'bg-light-cream'}
            shadow='sm'
            isPressable
            onPress={() => console.log('item pressed', name)}
          >
            <CardBody className='overflow-visible p-0'>
              <Image
                shadow='sm'
                radius='lg'
                width='100%'
                alt={name}
                className='w-full object-cover h-[140px]'
                src={'/images/products/placeholder.png'}
              />
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

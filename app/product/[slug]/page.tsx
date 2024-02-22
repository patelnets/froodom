import { getProducts } from '@/fetch-queries/products';
import { getProduct, STORES } from '@/fetch-queries/products/get-product';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { Image } from '@nextui-org/image';
import React from 'react';
import { Divider } from '@nextui-org/divider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/next-auth';

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  const product = await getProduct({ id: params.slug });
  return (
    <div className={'flex gap-2 flex-col justify-center items-center'}>
      <h1 className={'text-2xl'}> {product.name} </h1>
      <Image
        shadow='sm'
        radius='lg'
        width='100%'
        alt={product.name}
        className='w-full object-cover h-[300px]'
        src={
          product.header_image
            ? product.header_image
            : '/images/products/placeholder.png'
        }
      />
      <h2 className={'text-xl mt-2'}>Available at</h2>
      <ul>
        {product.stores.map((store) => (
          <li key={store}>
            {STORES.find(({ value }) => value === store)?.displayName}
          </li>
        ))}
      </ul>
      {session && (
        <Link className={'self-start'} href={`/product/${params.slug}/edit`}>
          <Button color='primary'>Edit</Button>
        </Link>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const res = await getProducts();

  return res.products.map(({ id }) => ({
    slug: id,
  }));
}

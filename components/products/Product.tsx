import Image from 'next/image';
import { STORES } from '@/fetch-queries/products/get-product';
import { GetProductsResponse } from '@/fetch-queries/products';

interface Props {
  product: GetProductsResponse['products'][0];
}
export const Product = ({ product }: Props) => {
  return (
    <div className={'flex gap-2 flex-col justify-center items-center'}>
      <h1 className={'text-2xl'}> {product.name} </h1>
      <div
        className={
          'h-[180px] w-[320px] relative w-full rounded-lg overflow-hidden'
        }
      >
        <Image
          alt={product.name}
          className='w-full object-cover'
          src={product.header_image}
          fill={true}
        />
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

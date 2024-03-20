import { getProducts } from '@/queries/products';
import { getProduct } from '@/queries/products/get-product';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/next-auth';
import { DeleteProduct } from '@/components/products/Delete';
import { Product } from '@/components/products/Product';

export const revalidate = 60;

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  const product = await getProduct({ id: params.slug });

  return (
    <div className={'flex flex-col justify-center items-center'}>
      <Product product={product} />
      {session && (
        <div className={'flex gap-2 my-2'}>
          <Link className={'self-start'} href={`/products/${params.slug}/edit`}>
            <Button color='primary'>Edit</Button>
          </Link>
          <DeleteProduct id={product.id} />
        </div>
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

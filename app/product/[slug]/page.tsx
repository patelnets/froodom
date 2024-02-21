import { getProducts } from '@/fetch-queries/products';
import { getProduct } from '@/fetch-queries/products/get-product';
import { Button } from '@nextui-org/button';
import Link from 'next/link';

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProduct({ id: params.slug });
  return (
    <div className={'flex gap-2 flex-col'}>
      <h1> {product.name} </h1>
      <h2>Stores </h2>
      <ul>
        {product.stores.map((store) => (
          <li key={store}>{store}</li>
        ))}
      </ul>
      <Link href={`/product/${params.slug}/edit`}>
        <Button color='primary'>Edit</Button>
      </Link>
    </div>
  );
}

export async function generateStaticParams() {
  const res = await getProducts();

  return res.products.map(({ id }) => ({
    slug: id,
  }));
}

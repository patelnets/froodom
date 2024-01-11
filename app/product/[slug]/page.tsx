import { getProducts } from '@/fetch-queries/products';
import { getProduct } from '@/fetch-queries/products/get-product';

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProduct({ id: params.slug });
  return <div>Name: {product.name}</div>;
}

export async function generateStaticParams() {
  const res = await getProducts();

  return res.products.map(({ id }) => ({
    slug: id,
  }));
}

import { getProducts } from '@/fetch-queries/products';
import { getProduct } from '@/fetch-queries/products/get-product';

import { ProductForm } from '@/components/products/ProductForm';

export const revalidate = 0;

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProduct({ id: params.slug });

  return (
    <div>
      <ProductForm initialValues={product} />
    </div>
  );
}

export async function generateStaticParams() {
  const res = await getProducts();

  return res.products.map(({ id }) => ({
    slug: id,
  }));
}

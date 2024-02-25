import { getProducts } from '@/api/products';
import { getProduct } from '@/api/products/get-product';

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

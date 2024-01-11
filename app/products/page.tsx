import { Products } from '@/components/products/Products';
import { getProducts } from '@/fetch-queries/products';
import { AddNewProductButton } from '@/components/products/AddNewProductButton';

export default async function Home() {
  const data = await getProducts();

  return (
    <div className={'flex flex-col gap-2'}>
      <AddNewProductButton />
      <Products products={data} />
    </div>
  );
}

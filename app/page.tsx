import { Products } from '@/components/products/Products';
import { getProducts } from '@/fetch-queries/products';
import { ProductForm } from '@/components/products/ProductForm';

export default async function Home() {
  const data = await getProducts();

  return (
    <div className={'p-2 flex flex-col items-center'}>
      <h1 className={'text-2xl font-bold my-4 text-center'}>
        Swaminarayan friendly food
      </h1>
      <Products products={data} />
    </div>
  );
}

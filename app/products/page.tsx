import { Products } from '@/components/products/Products';
import { getProducts } from '@/fetch-queries/products';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';

export default async function Home() {
  const data = await getProducts();

  return (
    <div className={'flex flex-col gap-2'}>
      <Link href={'/products/add'}>
        <Button>Add new product</Button>
      </Link>
      <Products products={data} />
    </div>
  );
}

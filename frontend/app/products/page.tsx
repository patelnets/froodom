import { Products } from '@/components/products/Products';
import { getProducts } from '@/queries/products';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/next-auth';

export const revalidate = 60;

export default async function Home() {
  const data = await getProducts();
  const session = await getServerSession(authOptions);
  return (
    <div className={'flex flex-col gap-2'}>
      {session && (
        <Link href={'/products/add'}>
          <Button>Add new product</Button>
        </Link>
      )}
      <Products products={data} />
    </div>
  );
}

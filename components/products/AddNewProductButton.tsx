'use client';
import { Button, Link } from '@nextui-org/react';
import { useSession } from 'next-auth/react';

export const AddNewProductButton = () => {
  const { data: session } = useSession();
  if (!session) {
    return null;
  }
  return (
    <Link href={'/products/add'}>
      <Button>Add new product</Button>
    </Link>
  );
};

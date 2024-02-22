'use client';

import { Button } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { deleteProduct } from '@/fetch-queries/products/delete-product';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Props {
  id: string;
}
export const DeleteProduct = ({ id }: Props) => {
  const { data: session } = useSession();
  const { mutate: mutateDelete, isPending } = useMutation({
    mutationFn: deleteProduct,
    throwOnError: true,
  });

  const router = useRouter();

  const onHandleDelete = () => {
    mutateDelete(
      // @ts-ignore
      { id, token: session?.token.id_token },
      {
        onSuccess: () => router.push('/products'),
      }
    );
  };

  if (!session) return null;
  return (
    <Button isLoading={isPending} onClick={onHandleDelete}>
      Delete Product
    </Button>
  );
};

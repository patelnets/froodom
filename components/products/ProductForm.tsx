'use client';

import {
  useForm,
  SubmitHandler,
  Controller,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { Input, CheckboxGroup, Checkbox, Button } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { addProduct, editProduct } from '@/fetch-queries/products';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { STORES } from '@/fetch-queries/products/get-product';
import { ImageUploads } from '@/components/products/ImageUploads';
import { Image } from '@nextui-org/react';
import { Divider } from '@nextui-org/divider';
import { ProductImages } from '@/components/products/ProductImages';

interface Inputs {
  name: string;
  stores: string[];
  image_urls: Record<string, string>;
  id?: string;
}

function ControlledInput(props: UseControllerProps<Inputs>) {
  const { field, fieldState } = useController(props);

  return (
    // @ts-ignore TODO Check how to narrow type
    <Input
      isRequired
      label='Name'
      className='max-w-xs'
      placeholder={props.name}
      {...field}
    />
  );
}

export const ProductForm = ({ initialValues }: { initialValues?: Inputs }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { mutate: mutateAdd, isPending: isPendingAdd } = useMutation({
    mutationFn: addProduct,
    throwOnError: true,
  });
  const { mutate: mutateEdit, isPending: isPendingEdit } = useMutation({
    mutationFn: editProduct,
    throwOnError: true,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: initialValues || { name: '', stores: [] },
  });

  // @ts-ignore TODO: fix
  if (!session?.token.id_token) {
    return null;
  }
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (initialValues?.id) {
      mutateEdit(
        {
          // @ts-ignore TODO: fix
          token: session?.token.id_token,
          data: { name: data.name, stores: data.stores, id: initialValues.id },
        },
        { onSuccess: () => router.push('/products') }
      );
    } else {
      mutateAdd(
        {
          // @ts-ignore TODO: fix
          token: session?.token.id_token,
          data: { name: data.name, stores: data.stores },
        },
        { onSuccess: () => router.push('/products') }
      );
    }
  };

  console.log(initialValues);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        name='name'
        control={control}
        rules={{ required: true }}
      />

      {errors.name && <span>This field is required</span>}

      <Controller
        name='stores'
        control={control}
        render={({ field: { value, onChange, ref, ...field } }) => (
          <CheckboxGroup
            className={'mt-5'}
            value={value}
            label='Select stores'
            onValueChange={onChange}
            isRequired
          >
            {STORES.map((store) => (
              <Checkbox key={store.value} value={store.value}>
                {store.displayName}
              </Checkbox>
            ))}
          </CheckboxGroup>
        )}
      />
      <Button className={'mt-5'} type='submit'>
        Submit
      </Button>
      <Divider className={'my-2'} />
      {initialValues && <ProductImages imageUrls={initialValues.image_urls} />}

      {initialValues?.id && (
        <div className={'my-4'}>
          <ImageUploads productId={initialValues?.id} />
        </div>
      )}
    </form>
  );
};

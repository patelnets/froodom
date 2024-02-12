'use client';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Input, CheckboxGroup, Checkbox, Button } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { addProduct } from '@/fetch-queries/products';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Inputs = {
  name: string;
  stores: string[];
};

export const AddNewProductForm = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { mutate, isPending, data } = useMutation({
    mutationFn: addProduct,
    throwOnError: true,
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  // @ts-ignore TODO: fix
  if (!session?.token.id_token) {
    return null;
  }
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    mutate(
      {
        // @ts-ignore TODO: fix
        token: session?.token.id_token,
        data: { name: data.name, stores: data.stores },
      },
      { onSuccess: () => router.push('/products') }
    );
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <Input
        isRequired
        label='Name'
        className='max-w-xs'
        {...register('name', { required: true })}
      />

      {/* errors will return when field validation fails  */}
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
            <Checkbox value='asda'>Asda</Checkbox>
            <Checkbox value='tesco'>Tesco</Checkbox>
            <Checkbox value='sainsburys'>Sainsbury{"'"}s</Checkbox>
            <Checkbox value='lidl'>Lidl</Checkbox>
            <Checkbox value='aldi'>Aldi</Checkbox>
          </CheckboxGroup>
        )}
      />

      <Button className={'mt-5'} type='submit'>
        Submit
      </Button>
    </form>
  );
};

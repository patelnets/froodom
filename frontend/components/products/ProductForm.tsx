'use client';

import {
  useForm,
  SubmitHandler,
  Controller,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import {
  Input,
  CheckboxGroup,
  Checkbox,
  Button,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import {
  addProduct,
  editProduct,
  STORES,
  PRIMARY_CATEGORIES,
} from '@/queries/products';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ImageUploads } from '@/components/products/ImageUploads';
import { Divider } from '@nextui-org/divider';
import { ProductImages } from '@/components/products/ProductImages';

interface Inputs {
  name: string;
  stores: string[];
  image_urls: Record<string, string>;
  id?: string;
  categories: string[];
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
    register,
  } = useForm<Inputs>({
    defaultValues: initialValues || {
      name: '',
      stores: [],
      categories: ['Sauces'],
    },
  });

  if (!session?.token.id_token) {
    return null;
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (initialValues?.id) {
      mutateEdit(
        {
          token: session?.token.id_token ?? '',
          data: {
            name: data.name,
            stores: data.stores,
            id: initialValues.id,
            categories: data.categories,
          },
        },
        {
          onSuccess: () => {
            router.refresh();
            router.push('/products');
          },
        }
      );
    } else {
      mutateAdd(
        {
          token: session?.token.id_token || '',
          data: {
            name: data.name,
            stores: data.stores,
            categories: data.categories,
          },
        },
        {
          onSuccess: () => {
            router.refresh();
            router.push('/products');
          },
        }
      );
    }
  };

  return (
    <form className={'flex flex-col'} onSubmit={handleSubmit(onSubmit)}>
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

      <Controller
        name='categories'
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange, ref, ...field } }) => {
          return (
            <Select
              label='Primary category'
              className='max-w-xs mt-5'
              value={value}
              isRequired={true}
              defaultSelectedKeys={value}
              onChange={(event) => {
                onChange(event.target.value.split(','));
              }}
              selectionMode='multiple'
              {...field}
            >
              {PRIMARY_CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.displayName}
                </SelectItem>
              ))}
            </Select>
          );
        }}
      />

      <Button className={'mt-5'} type='submit'>
        Submit
      </Button>

      <Divider className={'my-2'} />
      {initialValues?.image_urls && (
        <ProductImages imageUrls={initialValues.image_urls} />
      )}

      {initialValues?.id && (
        <div className={'my-4'}>
          <ImageUploads productId={initialValues?.id} />
        </div>
      )}
    </form>
  );
};

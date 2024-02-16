// import {Cards} from "@/components/cards/Cards";
// import {Autocomplete, AutocompleteItem} from "@nextui-org/react";

import { Products } from '@/components/products/Products';
import { getProducts } from '@/fetch-queries/products';
import { Button, Link } from '@nextui-org/react';

export default async function Home() {
  const data = await getProducts();

  return (
    <div className={'p-2'}>
      {/*<Autocomplete*/}
      {/*  defaultItems={STORES}*/}
      {/*  label="Favorite Animal"*/}
      {/*  placeholder="Search an animal"*/}
      {/*  className="max-w-xs"*/}
      {/*>*/}
      {/*  {(animal) => <AutocompleteItem key={animal.value}>{animal.label}</AutocompleteItem>}*/}
      {/*</Autocomplete>*/}
      {/*<Cards/>*/}
      <div className={'flex flex-col gap-2'}>
        <Link href={'/products/add'}>
          <Button>Add new product</Button>
        </Link>
        <Products products={data} />
      </div>
    </div>
  );
}

'use client';

import { NavbarItem, Button, Link } from '@nextui-org/react';
import { signIn, useSession } from 'next-auth/react';

export const SignIn = () => {
  const { data: session } = useSession();
  return (
    <>
      <NavbarItem>
        <Button
          as={Link}
          color='primary'
          onClick={() => signIn()}
          variant='flat'
        >
          Login
        </Button>
      </NavbarItem>
    </>
  );
};

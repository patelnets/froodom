'use client';

import { Button, Link } from '@nextui-org/react';
import { signIn, useSession } from 'next-auth/react';

export const SignIn = () => {
  const { data: session } = useSession();
  return (
    <>
      <Button as={Link} color='primary' onClick={() => signIn()} variant='flat'>
        Login
      </Button>
    </>
  );
};

'use client';

import { Button } from '@nextui-org/button';
import { signOut, useSession } from 'next-auth/react';
import { NavbarMenuItem } from '@nextui-org/navbar';

export const SignOut = () => {
  const { data: session } = useSession();
  return <Button onClick={() => signOut()}>Sign out</Button>;
};

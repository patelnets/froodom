'use client';

import { Button } from '@nextui-org/button';
import { signOut } from 'next-auth/react';

export const SignOut = () => {
  return <Button onClick={() => signOut()}>Sign out</Button>;
};

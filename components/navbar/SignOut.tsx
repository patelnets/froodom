'use client';

import { NavbarItem, Button, Link } from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import { NavbarMenuItem } from '@nextui-org/navbar';
import React from 'react';

export const SignOut = () => {
  const { data: session } = useSession();
  return (
    <>
      <NavbarMenuItem>
        <Link as={Link} color='danger' onClick={() => signOut()} size='lg'>
          Sign out
        </Link>
      </NavbarMenuItem>
    </>
  );
};

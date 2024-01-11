'use client';

import { Link } from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import { NavbarMenuItem } from '@nextui-org/navbar';

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

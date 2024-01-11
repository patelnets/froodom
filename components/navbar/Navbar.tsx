'use server';

import React from 'react';
import { Link } from '@nextui-org/link';
import {
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarBrand,
  NavbarMenuToggle,
  Navbar as NextUiNavbar,
} from '@nextui-org/navbar';
import { SignIn } from '@/components/navbar/SignIn';
import { getServerSession } from 'next-auth';
import { Avatar } from '@nextui-org/avatar';
import { SignOut } from '@/components/navbar/SignOut';
import { authOptions } from '@/libs/next-auth';

const menuItems = [
  { displayText: 'About us', href: '/about-us' },
  { displayText: 'Products', href: '/products' },
];

const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <NextUiNavbar maxWidth='full' className={'justify-between bg-dark-cream'}>
      <NavbarContent>
        <NavbarMenuToggle className='sm:hidden' />
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={'primary'}
                className='w-full'
                size='lg'
                href={item.href}
              >
                {item.displayText}
              </Link>
            </NavbarMenuItem>
          ))}
          {session && <SignOut />}
        </NavbarMenu>
        <NavbarBrand>
          <Link href={'/'}>
            <p className='font-bold text-inherit'>Froodom</p>{' '}
          </Link>
        </NavbarBrand>
        <NavbarItem className='hidden sm:flex'>
          <Link color='primary' href='/products'>
            Products
          </Link>
        </NavbarItem>
        <NavbarItem className='hidden sm:flex'>
          <Link href='/about-us'>About us</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className={'ml-auto'} justify='end'>
        {session?.user ? (
          <NavbarItem>
            <Avatar
              name={capitalizeFirstLetter(session.user?.email ?? 'Unknown')}
              showFallback
            />
          </NavbarItem>
        ) : (
          <SignIn />
        )}
      </NavbarContent>
    </NextUiNavbar>
  );
};

'use client';

import React from 'react';
import {
  Navbar as NextUiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  NavbarMenuToggle,
  Avatar,
} from '@nextui-org/react';
import { signIn, signOut, useSession } from 'next-auth/react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data: session } = useSession();
  console.log("session", session)

  const menuItems = [
    { displayText: 'About us', href: '/about-us' },
    { displayText: 'Products', href: '/products' },
  ];

  return (
    <NextUiNavbar
      maxWidth='full'
      className={'justify-between bg-dark-cream'}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
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
        {!session && (
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
        )}
        {session && (
          <NavbarItem>
            <Avatar showFallback />
          </NavbarItem>
        )}
      </NavbarContent>
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
        {session && (
          <NavbarMenuItem>
            <Link as={Link} color='danger' onClick={() => signOut()} size='lg'>
              Sign out
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </NextUiNavbar>
  );
};

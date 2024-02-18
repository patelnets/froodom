'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Link } from '@nextui-org/link';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { NavbarItem } from '@nextui-org/navbar';
// import React from 'react';

// export default async function Page() {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return null;
//   } else {
//     return (
//
//     );
//   }
// }

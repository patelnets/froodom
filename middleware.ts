export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/products/add', '/product/:productId/edit'],
};

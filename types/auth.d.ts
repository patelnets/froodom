import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    exp: number;
    expires_in: number;
    expires_at: number;
  }
}

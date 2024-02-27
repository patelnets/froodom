import { DefaultJWT, JWT } from 'next-auth/jwt';
import 'next-auth';

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    exp: number;
    expires_in: number;
    expires_at: number;
    id_token: string;
  }
}

declare module 'next-auth' {
  interface Session {
    token: JWT;
  }
}

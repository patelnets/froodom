import { NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { encode, getToken, JWT } from 'next-auth/jwt';

export const config = {
  matcher: ['/products/add', '/product/:productId/edit'],
};

async function refreshAccessToken(token: JWT): Promise<JWT> {
  const response = await fetch(
    'https://froodom.auth.eu-west-2.amazoncognito.com/oauth2/token' as string,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.COGNITO_CLIENT_ID as string,
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token as string,
      }),
      method: 'POST',
      cache: 'no-cache',
    }
  );
  const newToken: JWT = await response.json();
  if (!response.ok) {
    console.log('Error');
    console.log(response.statusText);
    console.log(newToken);
    console.log('Error end');
    throw newToken;
  }
  return newToken;
}

const sessionCookie = process.env.NEXTAUTH_URL?.startsWith('https://')
  ? '__Secure-next-auth.session-token'
  : 'next-auth.session-token';

function signOut(request: NextRequest) {
  const response = NextResponse.redirect(
    new URL('/api/auth/signin', request.url)
  );

  request.cookies.getAll().forEach((cookie) => {
    if (cookie.name.includes('next-auth.session-token'))
      response.cookies.delete(cookie.name);
  });

  return response;
}

function shouldUpdateToken(token: JWT): boolean {
  const timeInSeconds = Math.floor(Date.now() / 1000);
  return timeInSeconds >= token?.expires_at;
}

// Handle expired tokens
// https://github.com/nextauthjs/next-auth/discussions/9715#discussioncomment-8208649
export const middleware: NextMiddleware = async (request: NextRequest) => {
  const token = await getToken({ req: request });

  if (!token) return signOut(request);

  const response = NextResponse.next();

  if (shouldUpdateToken(token)) {
    // expiry of the refresh token
    if (!token.refresh_token || token.exp < Math.floor(Date.now() / 1000)) {
      return signOut(request);
    }

    const newToken = await refreshAccessToken(token);

    const newSessionToken = await encode({
      secret: process.env.NEXTAUTH_SECRET as string,
      token: {
        ...token,
        // @ts-expect-error newToken actually doesn't have expires_at field
        expires_at: Math.floor(Date.now() / 1000 + token.expires_in),
        ...newToken,
      },
      maxAge: 30 * 24 * 60 * 60,
    });

    const size = 3933; // maximum size of each chunk
    const regex = new RegExp('.{1,' + size + '}', 'g');

    const tokenChunks = newSessionToken.match(regex);

    if (tokenChunks) {
      tokenChunks.forEach((tokenChunk, index) => {
        response.cookies.set(`${sessionCookie}.${index}`, tokenChunk);
      });
    }
  }

  return response;
};

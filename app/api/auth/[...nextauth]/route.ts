import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"

const COGNITO_PROVIDER_OPTIONS = {
clientId: process.env.COGNITO_CLIENT_ID,
clientSecret: null,
issuer: process.env.COGNITO_ISSUER,
client: {
      token_endpoint_auth_method: "none"
    }
}

const handler = NextAuth({
    providers: [
    // @ts-expect-error You can give null for clientSecret https://github.com/nextauthjs/next-auth/issues/4707#issuecomment-1155046000
    CognitoProvider(COGNITO_PROVIDER_OPTIONS),
  ],

})

export { handler as GET, handler as POST }
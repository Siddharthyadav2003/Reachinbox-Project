import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
     GoogleProvider({
     clientId: "914135215112-kv1hb0jf28cu1pvq6r3j1aqitp38kdrj.apps.googleusercontent.com",
     clientSecret: "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",
     }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        token: { label: "Token", type: "text" }
      },
      async authorize(credentials) {
        if (credentials.token) {
          // Here you would typically validate the token
          // For this example, we'll just return a user object
          return { id: 1, name: "J Smith", email: "jsmith@example.com" }
        }
        return null
      } 
    })
  ],
   secret: "0123456789abcdef0123456789abcdef01234567",
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
      }
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user.id = token.id
      return session
    },
  },
  debug: true,
}

export default NextAuth(authOptions)

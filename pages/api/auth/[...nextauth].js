import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken (token) {
	try {

		spotifyApi.setAccessToken(token.accessToken)
		spotifyApi.setRefreshToken(token.refreshToken)

		const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
		console.log('refreshed token is', refreshedToken)

		return {
			...token,
			accessToken: refreshedToken.access_token,
			accessTokenExpired: Date.now() + refreshedToken.expires_in * 1000, // one hour 3600 returns from spotify API
			refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
		}
		
	} catch (error) {
		console.log(error)

		return {
			...token,
			error: 'RefreshAccessTokenError'
		}
	}
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
			authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
	secret: process.env.JWT_SECRET,
	pages: {
		signIn: '/login'
	},
	callbacks: {
		async jwt({ token, account, user }) {

			// initial sign in 


			if(account && user) {
				return {
					...token,
					access_token: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					accessTokenExpires: account.expires_at * 1000, // we are handling expiry time in milliseconds hance * 1000
				}
			}

			// return previous token if the access token ad not expired yet
			if (Date.now() < token.accessTokenExpires) {
				console.log('access token is valid')
				return token
			}

			// access token in expired, so we need to update it
			console.log('access token has expired, refreshing')
			return await refreshAccessToken(Token)

		},

		async session({ session, token }) {
			session.user.accessToken = token.access_token;
			session.user.username = token.username;
			session.user.refreshToken = token.refreshToken;
			return session
			
		}

		
	},
	
})
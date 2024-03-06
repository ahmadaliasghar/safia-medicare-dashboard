// import NextAuth from "next-auth"
// import CredentialsProvider from 'next-auth/providers/credentials'

// export const { handlers: { GET, POST }, auth } = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: {
//           label: "Username:",
//           type: "text",
//           placeholder: "your-cool-username"
//         },
//         password: {
//           label: "Password:",
//           type: "password",
//           placeholder: "your-awesome-password"
//         }
//       },
//       async authorize(credentials) {
//         const user = { id: "42", name: "Dave", password: "nextauth", role: "manager" }
//         if (credentials?.username === user.name && credentials?.password === user.password) {
//           return user
//         } else {
//           return null
//         }
//       }
//     })
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.role = user.role
//       return token
//     },
//     async session({ session, token }) {
//       if (session?.user) session.user.role = token.role
//       return session
//     },
//   }
// })

// // export const options: NextAuthOptions = {
// //     providers: [
// //         // GitHubProvider({
// //         //     profile(profile: GithubProfile) {
// //         //         //console.log(profile)
// //         //         return {
// //         //             ...profile,
// //         //             role: profile.role ?? "user",
// //         //             id: profile.id.toString(),
// //         //             image: profile.avatar_url,
// //         //         }
// //         //     },
// //         //     clientId: process.env.GITHUB_ID as string,
// //         //     clientSecret: process.env.GITHUB_SECRET as string,
// //         // }),
// //         CredentialsProvider({
// //             name: "Credentials",
// //             credentials: {
// //                 username: {
// //                     label: "Username:",
// //                     type: "text",
// //                     placeholder: "your-cool-username"
// //                 },
// //                 password: {
// //                     label: "Password:",
// //                     type: "password",
// //                     placeholder: "your-awesome-password"
// //                 }
// //             },
// //             async authorize(credentials) {
// //                 // This is where you need to retrieve user data 
// //                 // to verify with credentials
// //                 // Docs: https://next-auth.js.org/configuration/providers/credentials
// //                 const user = { id: "42", name: "Dave", password: "nextauth", role: "manager" }

// //                 if (credentials?.username === user.name && credentials?.password === user.password) {
// //                     return user
// //                 } else {
// //                     return null
// //                 }
// //             }
// //         })
// //     ],
// //     callbacks: {
// //         // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
// //         async jwt({ token, user }) {
// //             if (user) token.role = user.role
// //             return token
// //         },
// //         // If you want to use the role in client components
// //         async session({ session, token }) {
// //             if (session?.user) session.user.role = token.role
// //             return session
// //         },
// //     }
// // }
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'

const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your-cool-username"
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password"
        }
      },
      async authorize(credentials) {
        const user = { id: "42", name: "Dave", password: "nextauth", role: "manager" }
        if (credentials?.username === user.name && credentials?.password === user.password) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  basePath: "/auth",
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role
      return session
    },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name
      return token
    },
  }
}


export const { handlers, auth, signIn, signOut } = NextAuth(config)
// // Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
// import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
// import { NextResponse } from "next/server"

// export { auth as middleware } from "@/app/api/auth/[...nextauth]/option"


// export default auth(
//     // `withAuth` augments your `Request` with the user's token.
//     function middleware(request: NextRequestWithAuth) {
//         // console.log(request.nextUrl.pathname)
//         // console.log(request.nextauth.token)

//         if (request.nextUrl.pathname.startsWith("/extra")
//             && request.nextauth.token?.role !== "admin") {
//             return NextResponse.rewrite(
//                 new URL("/denied", request.url)
//             )
//         }

//         if (request.nextUrl.pathname.startsWith("/client")
//             && request.nextauth.token?.role !== "admin"
//             && request.nextauth.token?.role !== "manager") {
//             return NextResponse.rewrite(
//                 new URL("/denied", request.url)
//             )
//         }
//     },
//     {
//         callbacks: {
//             authorized: ({ token }) => !!token
//         },
//     }
// )

// // Applies next-auth only to matching routes - can be regex
// // Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = { matcher: ["/extra", "/client", "/dashboard"] }
// import { auth } from "@/app/api/auth/[...nextauth]/option"
// export default auth((req) => {
//   // req.auth
// })
export { auth as middleware } from "@/app/api/auth/[...nextauth]/auth"

// Or like this if you need to do something here.
// export default auth((req) => {
//   console.log(req.auth) //  { session: { user: { ... } } }
// })

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/client"],
}
import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import {
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
    apiAuthPrefix,
    authRoutes,
    appointmentDataRoutes
} from '@/routes'

 const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAppointmentRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    

    if(isAppointmentRoute){
        return;
    }

    if(isApiAuthRoute){
        return ;
    }

    
    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL("/auth/login", nextUrl))
        }

        return ;
    }


    if(!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL('/auth/login', nextUrl))
        
    }

    return ;
  
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
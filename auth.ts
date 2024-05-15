import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { PrismaClient } from "@prisma/client"
import { db } from "./lib/db"
import { getUserByEmail, getUserById } from "./data-query/users"
 
const prisma = new PrismaClient()
 
export const {
   handlers: {GET, POST}, auth, signIn, signOut 
  } = NextAuth({
    pages: {
      signIn: '/auth/login'
    },
  callbacks: {
    async session({token, session}){

      if(token.sub && session.user){
        session.user.id = token.sub
      }

      return session
    },
    async jwt({token}){
      if(!token.sub) return token

      const existingUser = await getUserById(token.sub)
      
      if(!existingUser) return token

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: {strategy: 'jwt'},
  ...authConfig,
})
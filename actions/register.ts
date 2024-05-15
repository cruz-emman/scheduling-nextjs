'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'

import { RegisterSchema } from '@/lib/schema'
import { getUserByEmail } from '@/data-query/users'


export const register = async (values:z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if(!validatedFields.success){
        return {error: "Invalid Fields"}
    }

    const {email, password, name} = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)
    const existingUser = await getUserByEmail(email)

    if(existingUser){
        return {error: "Email is already existing!"}
    }

await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return {success: "Account successfully Created!"}

}

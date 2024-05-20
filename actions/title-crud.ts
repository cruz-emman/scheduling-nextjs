'use server'
import { Title, titleSchema } from "@/lib/schema"
import { db } from "@/lib/db"


export async function getTitle (id: string){
     try {
        const data = await db.titleSample.findUnique({
            where: {
                id: id
            }
        })

        return data
    } catch (error) {
        throw error
    }
}

export const updateTitle = async ({ values, id }: { values: Title, id: string }) => {
    const validatedFields = titleSchema.safeParse(values)

    if(!validatedFields.success){
        return {error: "Form not submitted successfully"}
    }

    const isExisting = await getTitle(id)

    if(!isExisting) return {error: "Data is not existing"}

    const { title } = validatedFields.data

    try {
        await db.titleSample.update({
            where: {
                id: id
            },
            data: {
                title
            }
        })

        return {success: "updated work"}
    } catch (error) {
        return {error: "Something went wrong"}
    }

}
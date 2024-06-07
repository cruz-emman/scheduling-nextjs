

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { getSession } from "next-auth/react"
import { NextResponse } from "next/server"

interface DataProps {
    params: {
        id: string
    }
}


export async function PATCH(req: Request, data: DataProps) {
    try {
        const { params } = data;

        // Assuming auth() returns session information
        const session = await auth();

        if (!session || !session.user || !session.user.id) {
            // Handle missing session or user ID
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await db.appoinmentSchedule.update({
            where: {
                id: params.id
            },
            data: {
                status: 'done',
                // Inserting the current session user ID
                user: { connect: { id: session.user.id } }
            }
        });

        return NextResponse.json({ message: "Update success" }, { status: 200 });

    } catch (error) {
        console.log(error);
        // Handle error appropriately
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}



export async function GET(req: Request, data: DataProps){


    
    try {

        const session = await auth()   


        const {params} = data        

        const result = await db.appoinmentSchedule.findFirst({
            where: {
                id: params.id
            },
            include: {
                user: true
            }
          
        })

        console.log(session)
        return NextResponse.json(result, {status: 200})

    } catch (error) {
        console.log(error)
    }
}

import { db } from "@/lib/db"
import { NextResponse } from "next/server"

interface DataProps {
    params: {
        id: string
    }
}


export async function PATCH(req: Request, data: DataProps){
    
    try {
        const {params} = data        

        await db.appoinmentSchedule.update({
            where: {
                id: params.id
            },
            data: {
                softDelete: true
            }
        })
        return NextResponse.json({message: "Event has been deleted successsfully!"}, {status: 200})

    } catch (error) {
        console.log(error)
    }
}
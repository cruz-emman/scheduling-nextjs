import { db } from "@/lib/db"
import { NextResponse } from "next/server"

interface DataProps {
    params: {
        id: string
    }
}

export async function DELETE(req: Request, data: DataProps){
    try {
        const {params} = data
 

        await db.appoinmentSchedule.delete({
            where: {
                id: params.id
            },
      
        })
        return new Response(null,{status: 204})

    } catch (error) {
        return NextResponse.json({message: "could not update"}, {status: 500})

    }
}


export async function PATCH(req: Request, data: DataProps){
    
    try {
        const {params} = data
        const body = await req.json()
        
        console.log(params.id)

        await db.appoinmentSchedule.update({
            where: {
                id: params.id
            },
            data: {
                title: body.title
            }
        })
        return NextResponse.json({message: "update successs"}, {status: 200})

    } catch (error) {
        console.log(error)
    }
}

export async function GET(req:Request, data: DataProps){
    try {
        const {params} = data
        const post = await db.appoinmentSchedule.findFirst({
             where: {
                 id: params.id
             },
             
            
         })
         return NextResponse.json(post, {status: 200})
     } catch (error) {
         return NextResponse.json({message: "could not update"}, {status: 500})
 
     }
}
'use server'

import { db } from "@/lib/db"
import dayjs from "dayjs"

const now = dayjs();
const firstDay = now.startOf('month').toISOString();
const lastDay = now.endOf('month').toISOString();


export const getDataThisMonth = async () =>{
    try {
        const data = await db.appoinmentSchedule.findMany({
            where: {
            dateOfEvent: {
                    lte: lastDay,
                    gte: firstDay,
                },
              NOT: {
                OR: [
                  { status: 'done' },
                  { softDelete: true }
                ]
              },
      
            },
      
            include: {
              user: {
                select: {
                  name: true
                }
              }
            }
          });
      
          return data;
    } catch (error) {
        throw error
    }
}






export const doneEventThisMonth = async () => {

    try {
        const data = await db.appoinmentSchedule.count({
            where: {
                status: 'done',
                dateOfEvent: {
                    lte: lastDay,
                    gte: firstDay,
                }
            }
        })
        
        return data
    } catch (error) {
        throw error
    }
}




export const pendingEventThisMonth = async () => {

    try {
        const data = await db.appoinmentSchedule.count({
            where: {
                status: 'pending',
                dateOfEvent: {
                    lte: lastDay,
                    gte: firstDay,
                }
            }
        })
        
        return data
    } catch (error) {
        throw error
    }
}




export const confirmedEventThisMonth = async () => {

    try {
        const data = await db.appoinmentSchedule.count({
            where: {
                status: 'approved',
                dateOfEvent: {
                    lte: lastDay,
                    gte: firstDay,
                }
            }
        })
        
        return data
    } catch (error) {
        throw error
    }
}




export const canceledEventThisMonth = async () => {

    try {
        const data = await db.appoinmentSchedule.count({
            where: {
                status: 'canceled',
                dateOfEvent: {
                    lte: lastDay,
                    gte: firstDay,
                }
            }
        })
        
        return data
    } catch (error) {
        throw error
    }
}
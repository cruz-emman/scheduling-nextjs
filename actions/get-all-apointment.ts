'use server '

import { Events } from "@/components/admin/admin-column";
import { db } from "@/lib/db";


export async function getData(): Promise<Events[]> {
    try {
      const data = await db.appoinmentSchedule.findMany();
  
      return data;
    } catch (error) {
      return []; // Return an empty array in case of an error
    }
}



export async function getDataNotDryRun(): Promise<Events[]>{
  try {
    const data = await db.appoinmentSchedule.findMany({
      where: {
        doesHaveDryRun: 'no'
      }
    });

    return data;
  } catch (error) {
    return []; // Return an empty array in case of an error
  }
}


export async function getDataHastDryRun(): Promise<Events[]>{
  try {
    const data = await db.appoinmentSchedule.findMany({
      where: {
        doesHaveDryRun: 'yes'
      }
    });

    return data;
  } catch (error) {
    return []; // Return an empty array in case of an error
  }
}

export async function getSingleEvent(id:any){
  try {
    const data = await db.appoinmentSchedule.findUnique({
      where: {
        id: id
      }
    })

    return data
  } catch (error) {
    throw error
  }
}
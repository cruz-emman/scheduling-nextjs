'use server '

import { Events } from "@/components/admin/admin-column";
import { db } from "@/lib/db";


export async function getData(): Promise<Events[]> {
    try {
      const data = await db.appoinmentSchedule.findMany();
  
      return data;
    } catch (error) {
      throw error
    }
}



export async function getDataNotDryRun(): Promise<Events[]>{
  try {
    const data = await db.appoinmentSchedule.findMany({
      where: {
        doesHaveDryRun: false
      }
    });

    return data;
  } catch (error) {
    throw error
  }
}


export async function getDataHastDryRun(): Promise<Events[]>{
  try {
    const data = await db.appoinmentSchedule.findMany({
      where: {
        doesHaveDryRun: true
      }
    });

    return data;
  } catch (error) {
   throw error
  }
}


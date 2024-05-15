'use server'

import { db } from "@/lib/db";
import { Events } from "@/components/admin/admin-column";


export const getAllSchedule = async () =>{
    try {
        const data = await db.appoinmentSchedule.findMany()
        return data
    } catch (error) {
      throw error
    }
}



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
        doesHaveDryRun: 'no'
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
        doesHaveDryRun: 'yes'
      }
    });

    return data;
  } catch (error) {
    throw error
  }
}

export async function getDataById(id: any){
  try {
    const data = await db.appoinmentSchedule.findFirst({
      where: { id:id }
    })

    return data
  } catch (error) {
    throw error
  }
}

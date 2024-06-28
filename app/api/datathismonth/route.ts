import { Events } from "@/components/admin/datatable/admin-column";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:any) {
    const url  = new URL(request.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const currentQuery = searchParams.get('currentDate')

  
    try {
    
        const dataWithoutDryRun = await db.appoinmentSchedule.findMany({
          where: {
            dateOfEvent: currentQuery as string,
            status: 'approved',
            doesHaveDryRun: true,
            NOT: {
              OR: [
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

        const dataWithDryRun = await db.appoinmentSchedule.findMany({
          where: {
            dateOfEvent: currentQuery as string,
            status: 'approved',
            doesHaveDryRun: false,
            NOT: {
              OR: [
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

        
    
        return NextResponse.json({
          withoutDryRun: dataWithoutDryRun,
          withDryRun: dataWithDryRun
        }, { status: 200 });
      } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
  }
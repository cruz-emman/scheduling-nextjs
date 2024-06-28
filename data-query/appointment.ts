
import { Events } from "@/components/admin/datatable/admin-column";
import { db } from "@/lib/db";


export async function getData(): Promise<Events[]> {
  try {
    const data = await db.appoinmentSchedule.findMany({
      where: {
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



export async function getDataNotDryRun(): Promise<Events[]> {
  
  try {
    const data = await db.appoinmentSchedule.findMany({
      where: {
        doesHaveDryRun: false,
        status: 'approved',
        NOT: {
            softDelete: true
        },
      }
    });

    return data;
  } catch (error) {
    throw error
  }
}


export async function getDataHasDryRun(): Promise<Events[]> {
  
  try {
    const data = await db.appoinmentSchedule.findMany({
      where: {
        doesHaveDryRun: true,
        status: 'approved',
        NOT: {
            softDelete: true
        },
      }
    });

    return data;
  } catch (error) {
    throw error
  }
}

export async function getDataById(id: any) {
  try {
    const data = await db.appoinmentSchedule.findFirst({
      where: {
        id: id,
        NOT: {
          softDelete: true
        },
      }
    })

    return data
  } catch (error) {
    throw error
  }
}





// table only consist of done and cancel
export async function getTableResult() {
  try {
    const data = await db.appoinmentSchedule.findMany({
      where: {
        OR: [
          {
            status: 'done'
          },
          {
            status: 'cancel'
          }
        ]
      }
    })

    return data
  } catch (error) {
    throw error
  }
}
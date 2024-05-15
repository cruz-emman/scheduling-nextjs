import { db } from "@/lib/db";

interface EventPageDetailProps {
  params: {
    id:string
  }
}

async function getEvent(id: any){
  const response = await db.appoinmentSchedule.findFirst({
    where: {
      id: id
    }
  })

  return response
}

export default async function EventPageDetail({params}:EventPageDetailProps) {
  console.log(params)
  return (
    <div>

    </div>
  );
}

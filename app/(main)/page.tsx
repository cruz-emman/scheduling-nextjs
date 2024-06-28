'use client'

import { CalendarPicker } from "@/components/calendar-picker";
import { CardEvent } from "@/components/card-event";
import { Separator } from "@/components/ui/separator";
import { getDataHasDryRun } from "@/data-query/appointment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";



export default function Home() {

  const [currentData, setcurrentData] = useState<string>("")

  const getCurrentDate = (e: any) => {
    setcurrentData(e)
  }


  const { data: resultData, isPending, isError, error, refetch } = useQuery({
    queryKey: ['dryRunData'],
    queryFn: async () => {
      const res = await axios.get(`/api/datathismonth?currentDate=${currentData}`);
      return res.data;
    },


  })
  useEffect(() => {
    if (currentData) {
      refetch();
    }
  }, [currentData, refetch]);

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }


  return (
    <div className="w-full px-8 ">
      <div className="flex gap-x-2 ">
        <div className="flex-1 h-[800px] w-full  ">
          <CalendarPicker
            getCurrentDate={getCurrentDate}
            currentData={currentData}
            setCurrentData={setcurrentData}
          />
        </div>
        <div className="flex flex-1 gap-x-4 p-4 shadow-md border-2  rounded-lg">
          <div className="flex flex-col flex-1 w-full">
            <h1 className="text-lg font-semibold text-gray-400">Event Today</h1>
            <div className="h-full flex max-h-[650px] overflow-y-auto flex-col gap-y-2 flex-grow ">
              {resultData.withoutDryRun.length !== 0 ? (
                <CardEvent data={resultData.withDryRun} />
              ) : (
                <p className="pt-2 text-semibold italic">No events today</p>
              )}
            </div>
          </div>
          <Separator orientation="vertical" />

          <div className="flex flex-col flex-1 w-full ">
            <h1 className="text-lg font-semibold text-gray-400">Dry Run</h1>
            <div className="h-full flex max-h-[650px] overflow-y-auto flex-col gap-y-2 flex-grow ">
              {resultData.withDryRun.length !== 0 ? (
              <CardEvent data={resultData.withoutDryRun} />
            ) : (
                <p className="pt-2 text-semibold italic">No events today</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

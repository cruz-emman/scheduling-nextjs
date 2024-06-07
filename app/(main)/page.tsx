import { CalendarPicker } from "@/components/calendar-picker";
import { CardEvent } from "@/components/card-event";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { sampleEvent } from "@/sampleData";
import React from "react";



export default async function  Home() {

  return (
    <div className="w-full px-8 ">
      <div className="flex gap-x-2 ">
        <div className="flex-1 h-[800px] w-full  ">
          <CalendarPicker />
        </div>
        <div className="flex flex-1 gap-x-4 p-4 shadow-md border-2  rounded-lg">
        <div className="flex flex-col flex-1 w-full">
            <h1 className="text-lg font-semibold text-gray-400">Event Today</h1>
            <div className="h-full flex max-h-[650px] overflow-y-auto flex-col gap-y-2 flex-grow ">
              {/* <CardEvent data={dryRunEvent} /> */}
            </div>
          </div>
          <Separator orientation="vertical" />

          <div className="flex flex-col flex-1 w-full ">
            <h1 className="text-lg font-semibold text-gray-400">Dry Run</h1>
            <div className="h-full flex max-h-[650px] overflow-y-auto flex-col gap-y-2 flex-grow ">
              {/* <CardEvent data={noDryRun} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

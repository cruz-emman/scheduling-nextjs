"use client";

import React, { useState } from "react";

import { DataTable } from "./admin-data-table";
import { columns } from "./admin-column";
import { Calendar } from "../ui/calendar";
export const AdminCalendarSelection = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div>
      {" "}
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        showOutsideDays
        fixedWeeks
        numberOfMonths={3}
        classNames={{
          months:
            "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
          month: "space-y-4 w-full flex flex-col",
          table: "flex items-center flex-col border-collapse space-y-1",
          caption: "flex justify-center pt-1 relative items-center",

          head_row: "",
          cell: "h-4 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
          row: "w-full mt-2",
          nav_button_previous: "bg-blue-400 absolute left-1",
          nav_button_next: "bg-blue-400 absolute right-1",
        }}
      />
    </div>
  );
};

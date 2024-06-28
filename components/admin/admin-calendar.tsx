import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { DataTable } from "./datatable/admin-data-table";
import {  columnsEvent } from "./datatable/admin-column";
import { sampleEvent } from "@/sampleData";
import {
  getData,
  getDataHasDryRun,
  getDataNotDryRun,
} from "@/data-query/appointment";
import { AdminCalendarSelection } from "./admin-calendar-selection";

export const AdminCalendar = async () => {
  const data = await getData();
  const dataHasDryRun = await getDataHasDryRun();
  const dataNoDryRun = await getDataNotDryRun();

  return (
    <div className="h-full w-full mx-16 flex flex-col gap-y-2 overflow-hidden">
      <AdminCalendarSelection />
      <div className="flex flex-row gap-x-4">
        <div className="flex-1 flex-col flex">
          <p className="font-semibold">Event Today</p>
          <DataTable columns={columnsEvent} data={dataHasDryRun} />
        </div>
        <div className="flex-1 flex-col flex">
          <p className="font-semibold">Dry Run Today</p>
          <DataTable columns={columnsEvent} data={dataNoDryRun} />
        </div>
      </div>
    </div>
  );
};

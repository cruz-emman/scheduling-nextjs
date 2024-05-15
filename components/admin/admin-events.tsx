import React from "react";
import { DataTable } from "./admin-data-table";
import { columns } from "./admin-column";
import { getData } from "@/actions/get-all-apointment";
import { AdminContainer } from "./admin-container";

export default async function AdminEvents() {
  const data = await getData();

  
  return (
    <div className="hidden flex-col md:flex mx-16 w-full ">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

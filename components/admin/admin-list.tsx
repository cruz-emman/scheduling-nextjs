import React from "react";

import { db } from "@/lib/db";
import { getData } from "@/data-query/appointment";
import { DataTable } from "./datatable/admin-data-table";
import { columnDashboard } from "./datatable/admin-column";


export const AdminList = async () => {
  const data = await getData();
  


  return (
    <>
     <DataTable columns={columnDashboard} data={data} />
    </>
  );
};

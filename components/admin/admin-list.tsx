import React from "react";
import { DataTable } from "@/components/admin/admin-data-table";
import { Events, columns } from "@/components/admin/admin-column";
import { db } from "@/lib/db";
import { getData } from "@/data-query/appointment";


export const AdminList = async () => {
  const data = await getData();

  return <DataTable columns={columns} data={data} />;
};

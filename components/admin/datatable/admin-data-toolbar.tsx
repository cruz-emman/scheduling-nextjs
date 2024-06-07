'use client'

import { Input } from "@/components/ui/input";
import { statusResult, statuses } from "@/sampleData";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "./admin-data-table-view-option";
import { DataTableFacetedFilter } from "./admin-data-filtered";
import { usePathname } from "next/navigation";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const path = usePathname()
  const isFiltered = table.getState().columnFilters.length > 0;
  
  const currentURL = path.split('/')
  const endOfURL = currentURL[currentURL.length - 1]


  return (
    <div className="flex items-center justify-between mx-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter Title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={endOfURL === 'result'? statusResult : statuses}
          />
        )}


        {/* {table.getColumn("dateOfEvent") && (
          <FilterByDate
            column={table.getColumn("dateOfEvent")}
            title="Date"
          />
        )} */}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

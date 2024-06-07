import * as React from "react";
import { Column } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

interface FilterByDateProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
}

export default function FilterByDate<TData, TValue>({
  column,
  title,
}: FilterByDateProps<TData, TValue>) {
  const [filterValue, setFilterValue] = React.useState("");


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterValue(value); 
    console.log(column?.setFilterValue(value))

    column?.setFilterValue(value); // Update column's filter value directly
  };


  return (
    <div>
      <Input
        placeholder={title || "Date"}
        type="month"
        value={filterValue}
        onChange={handleChange}
      />
    </div>
  );
}

import { FilterFn } from '@tanstack/react-table';
import dayjs from 'dayjs'; // Or use another date library like date-fns

interface Props {
  row: any,
  columnId: any,
  value: any
}

export const filterByMonth = (row, columnId, value, addMeta) => {


  console.log("Hello")

  // Parse the values using dayjs
  const selectedDate = dayjs(value);
  const rowDate = dayjs(row.getValue(columnId), "M/D/YY"); // Adjust format if necessary

  addMeta({
    itemRank: selectedDate.isSame(rowDate, "month") ? 1 : 0,
  });

  return selectedDate.isSame(rowDate, "month");
};

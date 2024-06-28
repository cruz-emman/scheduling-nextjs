import { AppWindowIcon, BarChart, Calendar, CalendarCheck, DeleteIcon, LayoutDashboard, Table2 } from "lucide-react";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <div className="flex relative flex-col max-w-[240px]  gap-y-2 w-full ">
      <ul className="flex flex-col w-full  pt-[20px] gap-y-2">
        <Link href="/admin">
          <li className="flex gap-x-2 cursor-pointer px-8 py-4 hover:bg-gray-100 ">
            <LayoutDashboard />
            <span>Dashboard</span>
          </li>
        </Link>
        
        <Link href="/admin/appointment">
          <li className="flex gap-x-2 cursor-pointer px-8 py-4 hover:bg-gray-100 ">
            <AppWindowIcon />
            <span>Appointment</span>
          </li>
        </Link>
        <Link href="/admin/result">
          <li className="flex gap-x-2 cursor-pointer px-8 py-4 hover:bg-gray-100 ">
            <Table2 />
            <span>Result</span>
          </li>
        </Link>
        <Link href="/admin/report">
          <li className="flex gap-x-2 cursor-pointer px-8 py-4 hover:bg-gray-100 ">
            <BarChart />
            <span>Overview Reports</span>
          </li>
        </Link>
        {/* <Link href="/admin/deleted">
          <li className="absolute bottom-0 flex gap-x-2  w-full cursor-pointer px-8 py-4 hover:bg-gray-100 ">
            <DeleteIcon />
            <span>Deleted</span>
          </li>
        </Link> */}
      </ul>
    </div>
  );
};

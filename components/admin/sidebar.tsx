import { Calendar, CalendarCheck, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <div className="flex flex-col max-w-[240px]  gap-y-2 w-full ">
      <ul className="flex flex-col w-full  pt-[20px] gap-y-2">
        <Link href="/admin">
          <li className="flex gap-x-2 cursor-pointer px-8 py-4 hover:bg-gray-100 ">
            <LayoutDashboard />
            <span>Dashboard</span>
          </li>
        </Link>
        <Link href="/admin/calendar">
          <li className="flex gap-x-2 cursor-pointer px-8 py-4 hover:bg-gray-100 ">
            <Calendar />
            <span>Calendar</span>
          </li>
        </Link>
        <Link href="/admin/events">
          <li className="flex gap-x-2 cursor-pointer px-8 py-4 hover:bg-gray-100 ">
            <CalendarCheck />
            <span>Events</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

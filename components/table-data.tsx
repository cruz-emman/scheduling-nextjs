import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BadgeCheck, BadgeX } from "lucide-react";

const dataTable = [
  {
    features: "Max Participants",
    meeting: <span className="font-bold">1000</span>,
    webinar: <span className="font-bold">500</span>,
  },
  {
    features: "Attendees can open their Camera",
    meeting: <BadgeCheck className="text-green-500" />,
    webinar: <BadgeX className="text-red-500" />,
  },
  {
    features: "Waiting Room",
    meeting: <BadgeCheck className="text-green-500" />,
    webinar: <BadgeX className="text-red-500" />,
  },
  {
    features: "Practice Sessions",
    meeting: <BadgeX className="text-red-500" />,
    webinar: <BadgeCheck className="text-green-500" />,
  },
  {
    features: "Livestreaming",
    meeting: <BadgeCheck className="text-green-500" />,
    webinar: <BadgeCheck className="text-green-500" />,
  },
  {
    features: "Recording",
    meeting: <BadgeCheck className="text-green-500" />,
    webinar: <BadgeCheck className="text-green-500" />,
  },
  {
    features: "Poll",
    meeting: <BadgeCheck className="text-green-500" />,
    webinar: <BadgeCheck className="text-green-500" />,
  },
  {
    features: "Breakout Room",
    meeting: <BadgeCheck className="text-green-500" />,
    webinar: <BadgeX className="text-red-500" />,
  },
  {
    features: "Q&A Box",
    meeting: <BadgeX className="text-red-500" />,
    webinar: <BadgeCheck className="text-green-500" />,
  },
  {
    features: "Panelist",
    meeting: <BadgeX className="text-red-500" />,
    webinar: <BadgeCheck className="text-green-500" />,
  },
  {
    features: "Reminder Email",
    meeting: <BadgeX className="text-red-500" />,
    webinar: <BadgeCheck className="text-green-500" />,
  },
];

function TableDataSample() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Features</TableHead>
          <TableHead>Meeting</TableHead>
          <TableHead>Webinar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataTable.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.features}</TableCell>
            <TableCell>{item.meeting}</TableCell>
            <TableCell>{item.webinar}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TableDataSample;

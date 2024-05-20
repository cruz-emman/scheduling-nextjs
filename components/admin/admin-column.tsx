"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, PanelRightCloseIcon, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./admin-data-column-header";
import { Badge } from "@/components/ui/badge";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Events = {
  id: string;
  title: string;
  email: string;
  fullName: string;
  contactPerson: string;
  department: string;
  status: "PENDING" | "SUCCESS";

  dateOfEvent: string;
  startingTime: string;
  endingTime: string;

  purpose: string;

  doesHaveDryRun: boolean;
  dryRunDate?: string | null; // Optional
  dryRunStart?: string | null; // Optional
  dryRunEnd?: string | null; // Optional

  doesHaveTCETAssitance: string;
  tcetOtherAssitance?: string | null; // Optional

  meetingTypeOption: string;
  meetingTypeServices: string;
  meetingTypeServiceLink?: string | null; // Optional
  cameraSetup?: string | null; // Optional
}

export const columns: ColumnDef<Events>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const data = row.original;

      return (
        <>
          {data.status === "PENDING" ? (
            <Badge variant="destructive">Pending</Badge>
          ) : (
            <Badge variant="approved">Approved</Badge>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "dateOfEvent",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Event Date" />;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "doesHaveDryRun",
    header: "Dry Run",
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "meetingTypeOption",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Meeting Type" />
    ),
    cell: ({ row }) => {
      const type = row.original;
      const data = type.meetingTypeOption;
      return (
        <>
          {data === "meeting" && <Badge variant="meeting">meeting</Badge>}
          {data === "webinar" && <Badge variant="webinar">webinar</Badge>}
          {data === "hybrid" && <Badge variant="hybrid">hybrid</Badge>}
          {data === "documentation" && (
            <Badge variant="documentation">documentation</Badge>
          )}
          {data === "training" && <Badge variant="training">training</Badge>}
        </>
      );
    },
  },

  {
    id: "actions",

    cell: ({ row }) => {
      const data = row.original;
      const router = useRouter(); // Get the router

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => router.push(`/admin/edit/${data.id}`)}
            >
              <PanelRightCloseIcon className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const columnsEvent: ColumnDef<Events>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const data = row.original;

      return (
        <>
          {data.status === "PENDING" ? (
            <Badge variant="destructive">Pending</Badge>
          ) : (
            <Badge variant="approved">Approved</Badge>
          )}
        </>
      );
    },
  },

  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "doesHaveDryRun",
    header: "Dry Run",
  },

  {
    accessorKey: "meetingTypeOption",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Meeting Type" />
    ),
    cell: ({ row }) => {
      const type = row.original;
      const data = type.meetingTypeOption;
      return (
        <>
          {data === "meeting" && <Badge variant="meeting">meeting</Badge>}
          {data === "webinar" && <Badge variant="webinar">webinar</Badge>}
          {data === "hybrid" && <Badge variant="hybrid">hybrid</Badge>}
          {data === "documentation" && (
            <Badge variant="documentation">documentation</Badge>
          )}
          {data === "training" && <Badge variant="training">training</Badge>}
        </>
      );
    },
  },

  {
    id: "actions",

    cell: ({ row }) => {
      const data = row.original;
      const router = useRouter(); // Get the router

      const {mutate:deletePost} = useMutation({
        mutationFn: async () =>{
            return axios.delete(`/api/edit/${data.id}`)
        },
        onError: (error) =>{
            console.log(error)
        },
        onSuccess: () =>{
            router.push('/admin/calendar')
            router.refresh()
        }
    })

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => router.push(`/admin/edit/${data.id}`)}
            >
              <PanelRightCloseIcon className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => deletePost()}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

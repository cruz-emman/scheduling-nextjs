"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Events } from "../datatable/admin-column";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  CheckCheck,
  CircleDot,
  DeleteIcon,
  MoreHorizontal,
  PanelRightCloseIcon,
  Trash2,
  UserPlus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const resultColumns: ColumnDef<Events>[] = [
  {
    accessorKey: "status",
    header: "Status",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      const data = row.original;

      return (
        <>
          {data.status === "done" && (
            <Badge variant="done">
              <CheckCheck className="mr-2 h-4 w-4" />
              Done
            </Badge>
          )}
          {data.status === "cancel" && (
            <Badge variant="destructive">
              <DeleteIcon className="mr-2 h-4 w-4" />
              Cancel
            </Badge>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "meetingTypeOption",
    header: "Type",
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
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "dateOfEvent",
    header: "requested date",
  },
  {
    accessorKey: "email",
    header: "requested by: ",
  },
  {
    accessorKey: "user",
    header: "approved by: ",
  },
  {
    id: "actions",

    cell: ({ row }) => {
      const data = row.original;
      const status = data.status;

      const router = useRouter(); // Get the router

      const { mutate: approvedButton } = useMutation({
        mutationFn: async () => {
          return axios.patch(`/api/approved/${data.id}`);
        },
        onError: (error) => {
          console.log(error);
        },
        onSuccess: () => {
          router.push("/admin");
          router.refresh();
        },
      });

      const { mutate: doneButton } = useMutation({
        mutationFn: async () => {
          return axios.patch(`/api/doneButton/${data.id}`);
        },
        onError: (error) => {
          console.log(error);
        },
        onSuccess: () => {
          router.push("/admin");
          router.refresh();
        },
      });

      const { mutate: pendngButton } = useMutation({
        mutationFn: async () => {
          return axios.patch(`/api/pending/${data.id}`);
        },
        onError: (error) => {
          console.log(error);
        },
        onSuccess: () => {
          router.push("/admin");
          router.refresh();
        },
      });

      const { mutate: softdelete } = useMutation({
        mutationFn: async () => {
          return axios.patch(`/api/softdelete/${data.id}`);
        },
        onError: (error) => {
          console.log(error);
        },
        onSuccess: () => {
          router.push("/admin/calendar");
          router.refresh();
        },
      });

      return (
        <>
          {status !== "done" && (
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
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Update</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuSeparator />
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => softdelete()}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </>
      );
    },
  },
];

"use client";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Check,
  CheckCheck,
  CircleDot,
  Mail,
  MessageSquare,
  MoreHorizontal,
  PanelRightCloseIcon,
  PlusCircle,
  Trash2,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./admin-data-column-header";
import { Badge } from "@/components/ui/badge";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { DropdownMenuSub } from "@radix-ui/react-dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Events = {
  id: string;
  title: string;
  email: string;
  fullName: string;
  contactPerson: string;
  department: string;
  status: string;

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
  user?: any | null;
};

export const columnDashboard: ColumnDef<Events>[] = [
  {
    accessorKey: "status",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
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
          {data.status === "approved" && (
            <Badge variant="approved">Approved</Badge>
          )}
          {data.status === "pending" && (
            <Badge variant="destructive">Pending</Badge>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="approved by:" />
    ),
    cell: ({ row }) => {
      const type = row.original;
      let user = type.user;

      return (
        <>
          {user.length !== 0 ? (
            <Badge variant="outline"> {user[0]?.name} </Badge>
          ) : (
            <Badge variant="outline"> not yet approved </Badge>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "dateOfEvent",
    header: 'Date of Event',
    cell: ({ row }) => {
      const dateEvent = row.original.dateOfEvent;
      return format(new Date(dateEvent), "dd/MM/yyyy");
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "doesHaveDryRun",
    header: "Dry Run",
    cell: ({row}) => {
      const hasDryRun = row.original.doesHaveDryRun
      return(
        <>
        {hasDryRun === true ? (
          <Badge variant="approved">Yes</Badge>
        ): (
          <Badge variant="destructive">No</Badge>
        )}
        </>
      )
    }
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
      const isApproved = data.user.length !== 0 ? true : false;
      const router = useRouter(); // Get the router
      const { toast } = useToast()


      const { mutate: approvedButton } = useMutation({
        mutationFn: async () => {
          // Display the toast message
    
      
          // Perform the API call
          return axios.patch(`/api/approved/${data.id}`);
        },
        onError: (error) => {
          console.log(error);
        },
        onSuccess: () => {
          toast({
            title: "Successfully Approved",
            description: `The title named "${data?.title}" has been successfully approved! `
          });
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
          toast({
            title: "Done",
            description: `The title named "${data?.title}" has been completly finished `
          });
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
          toast({
            title: "Change to Pending",
            description: `The title named "${data?.title}" has been change to pending `
          });
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
          toast({
            title: "Deleted successfully",
            description: `The title named "${data?.title}" has been deleted permanently `
          });
          router.push("/admin");
          router.refresh();
        },
      });

      return (
        <AlertDialog>
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
                    {!isApproved ? (
                      <DropdownMenuItem onClick={() => approvedButton()}>
                        <Check className="mr-2 h-4 w-4 text-emerald-600" />
                        <span>Approved</span>
                      </DropdownMenuItem>
                    ) : (
                      <>
                        <DropdownMenuItem onClick={() => doneButton()}>
                          <CheckCheck className="mr-2 h-4 w-4 text-emerald-600" />
                          <span>Mark as Done</span>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="gap-y-12" />

                        <DropdownMenuItem onClick={() => pendngButton()}>
                          <CircleDot className="mr-2 h-4 w-4 text-rose-600" />
                          <span>Pending</span>
                        </DropdownMenuItem>
                      </>
                    )}

                    <DropdownMenuSeparator />
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Trash2 className="mr-2 h-4 w-4" />
                <AlertDialogTrigger>Delete</AlertDialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                event and hide your data from our dashbaord.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => softdelete()}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
          {data.status === "pending" ? (
            <Badge variant="destructive">Pending</Badge>
          ) : (
            <Badge variant="approved">Approved</Badge>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "user",
    header: "Approved By",
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

      const { mutate: approvedButton } = useMutation({
        mutationFn: async () => {
          return axios.patch(`/api/approved/${data.id}`);
        },
        onError: (error) => {
          console.log(error);
        },
        onSuccess: () => {
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
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Update</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => approvedButton()}>
                    <Check className="mr-2 h-4 w-4 text-emerald-600" />
                    <span>Approved</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => pendngButton()}>
                    <CircleDot className="mr-2 h-4 w-4 text-rose-600" />
                    <span>Pending</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem onClick={() => softdelete()}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

'use server'

import React from "react";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, CircleDot, UserPlus } from "lucide-react";


interface Props {
 params: string
}

export const DropDownMenuComponent = async ({params}:Props) => {
  return (
    <>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <UserPlus className="mr-2 h-4 w-4" />
          <span>Update</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              onClick={() => {
                console.log(params)
              }}
            >
              <Check className="mr-2 h-4 w-4 text-emerald-600" />
              <span>Approved</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CircleDot className="mr-2 h-4 w-4 text-rose-600" />
              <span>Pending</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </>
  );
};

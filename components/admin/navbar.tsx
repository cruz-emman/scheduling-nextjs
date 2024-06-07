'use client'

import { logout } from "@/actions/logout"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"

export const Navbar = () =>{
    return (
        <div className="h-[60px] z-[100] fixed w-full border-b-2 shadow-sm bg-slate-100">
            <div className="max-w-7xl h-full mx-auto flex items-center ">
                    <p className="font-medium text-2xl">TCET</p>
                    <Button onClick={() => signOut()}>Signout</Button>

            </div>

          
        </div>
    )
}
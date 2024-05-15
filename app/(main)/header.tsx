import Image from 'next/image'
import React from 'react'

export default function Header() {
  return (
    <div className='h-20 w-full border-b-2 border-slate-200 px-4'>
        <div className='lg:max-w-screen-lg mx-auto flex items-center justify-between h-full'>
           <Image 
            src="/tcet_fullname.png"
            width={250}
            height={250}
            alt="Logo"
           />
        </div>
    </div>
  )
}

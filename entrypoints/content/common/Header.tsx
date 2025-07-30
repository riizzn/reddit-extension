import React from 'react'
import { X } from "lucide-react";

type HeaderProps={
    title :string ;
    count: number ;
    onRemove:()=> void
}

const Header = ({title, count, onRemove}: HeaderProps) => {
  return (
    <div className="flex items-center justify-between px-5 border-b border-border bg-background gap-2">
        <div className=" flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-100 tracking-tight">{title}</h2>

            <span className=" text-sm font-normal text-gray-300">
              ({count})
            </span>

        </div>
        <button onClick={onRemove} className="p-2 rounded-md text-gray-500 hover:bg-gray-300 transition-colors" aria-label="Close">
         <X className='w-5 h-5'/>
        </button>

    </div>

  )
}

export default Header
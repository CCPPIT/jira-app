import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { Calendar1Icon, ChevronLeftIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react'
import React from 'react'

type Props = {
    date:Date
    onNavigat:(action:"PREV"|"NEXT"|"TODAY")=>void
}

const CustomToolBar = ({date,onNavigat}: Props) => {
  return (
    <div className='flex mb-4 gap-x-2 items-center w-full lg:w-auto justify-center lg:justify-start'>
         <Button onClick={()=>onNavigat("PREV")}
         variant={"destructive"}
         size={"icon"}
        
            >

                <ChevronsLeftIcon className='size-4'/>


         </Button>
         <div className='flex items-center border border-input rounded-md px-3 py-2 h-8 justify-center w-full lg:w-auto'>
            <Calendar1Icon className='size-4 mr-2'/>
            <p>{format(date,"MMMM yyyy")}</p>
         </div>
         <Button onClick={()=>onNavigat("NEXT")}
         variant={"destructive"}
         size={"icon"}
         
            >

                <ChevronsRightIcon className='size-4'/>


         </Button>
    </div>
  )
}

export default CustomToolBar
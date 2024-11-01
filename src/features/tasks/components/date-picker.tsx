"use client"
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import React from 'react'

type Props = {
    value:Date|undefined,
    onChange:(date:Date)=>void,
    className?:string,
    placehilder?:string
}

const DatePicker = ({value,onChange,className,placehilder="Select Date"}: Props) => {
  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button
            variant={"outline"}
            size={"lg"}
            className={cn("w-full justify-start text-left font-normal px-3",
                !value&&"text-muted-foreground",className
            )}
            >
                <CalendarIcon className='h-4 w-4 mr-2'/>
                {value?format(value,"PPP"):<span>{placehilder}</span>}
            </Button>
            
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
            <Calendar
            mode='single'
            selected={value}
            onSelect={(date)=>onChange(date as Date)}
            initialFocus
            />
        </PopoverContent>
    </Popover>
  )
}

export default DatePicker
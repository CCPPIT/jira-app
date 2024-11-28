import React from 'react'
import {FaCaretUp,FaCaretDown} from "react-icons/fa"
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { cn } from '@/lib/utils'

type Props = {
    title:string
    value:number
    variant:"up"|"down"
    increasseValue:number
}

 export const AnalyticsCard = ({title,value,increasseValue,variant}: Props) => {
    const iconColor=variant==="up"?"text-emerald-500":"text-red-500";
    const increasseValueColor=variant==="up"?"text-emerald-500":"text-red-500";
    const Icon=variant ==="up"?FaCaretUp:FaCaretDown
  return (
    <Card className='border-none w-full shadow-none'>
        <CardHeader>
            <div className='flex items-center gap-x-2.5'>
                <CardDescription className='flex items-center gap-x-2 font-medium overflow-hidden'>
                    <span className='truncate text-base'>{title}</span>

                </CardDescription>
                <div className='flex items-center gap-x-1'>
                    <Icon className={cn(iconColor,"size-4")}/>
                    <span className={cn(increasseValue,"text-base truncate font-medium")}>{increasseValue}</span>

                </div>

            </div>
            <CardTitle className='text-3xl font-semibold'>
                {value}
            </CardTitle>

        </CardHeader>
    </Card>
  )
}


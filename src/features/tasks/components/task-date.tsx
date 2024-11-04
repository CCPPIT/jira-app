"use client"
import React from 'react'
import {format,differenceInDays}from "date-fns"
import { cn } from '@/lib/utils'

type Props = {
    value:string,
    className?:string
}

const TaskDate = ({value,className}: Props) => {
    const today=new Date()
    const endDate=new Date(value)
    const diffInDays=differenceInDays(today,endDate)
    let textColor="text-muted-foregrounded"
    if(diffInDays<=3){
        textColor="text-red-500"
    }else if(diffInDays<=7){
        textColor="text-orange-500"
    }else if(diffInDays<=14){
        textColor="text-yellow-700"


    }

  return (
    <div className={textColor}>
        <span className={cn("truncate",className)}>{format(value,'PPP')}</span>
    </div>
  )
}

export default TaskDate
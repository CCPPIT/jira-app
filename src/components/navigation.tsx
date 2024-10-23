import { cn } from '@/lib/utils'
import { SettingsIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {GoHome,GoHomeFill,GoCheckCircle,GoCheckCircleFill}from "react-icons/go"

type Props = {}
const routes=[
    {
        label:"Home",
        href:"",
        icon:GoHome,
        activeIcon:GoHomeFill
    },
    {
        label:"My Tasks",
        href:"/tasks",
        icon:GoCheckCircle,
        activeIcon:GoCheckCircleFill
    },
    {
        label:"Settings",
        href:"/settings",
        icon:SettingsIcon,
        activeIcon:SettingsIcon
    },
    {
        label:"Members",
        href:"/members",
        icon:UserIcon,
        activeIcon:UserIcon
    }
]

const Navigation = (props: Props) => {
  return (
    <ul className='flex flex-col'>
        {routes.map((item)=>{
            const isActive=false;
            const Icon=isActive?item.activeIcon:item.icon
            return(
                <Link key={item.href} href={item.href}>
                <div className={cn("flex items-center gap-2.5 p-2.5 rounded-md font-medium   hover:text-primary shadow-sm text-neutral-500 transform",
                    isActive && "bg-amber-900 hover:opacity-100 shadow-sm text-primary"
                )}>
                    <Icon className='size-5 text-neutral-500'/>
                    {item.label}

                </div>
                </Link>
                
            )
        })}

    </ul>
  )
}

export default Navigation
"use client"
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'
import SideBar from './sidebar'

type Props = {}

const MobilSideBar = (props: Props) => {
  return (
    <Sheet modal={false}>
        <SheetTrigger asChild>
            <Button size={"icon"} variant={"secondary"} className='lg:hidden'>
                <MenuIcon className='size-4 text-neutral-500'/>
            </Button>

        </SheetTrigger>
        <SheetContent side={"left"} className='p-0'>
            <SideBar/>
        </SheetContent>

    </Sheet>
  )
}

export default MobilSideBar
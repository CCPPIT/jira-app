import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Separator } from './ui/separator'
import Navigation from './navigation'

type Props = {}

const SideBar = (props: Props) => {
  return (
    <aside className='h-full bg-neutral-100 p-4  w-full'>
        <Link href={"/"} >
        <div className='flex'>
        <Image  src={"/logo.svg"} alt='logo'  width={100} height={48}/>

         <p className=' flex items-center text-xl font-bold gap-x-0 text-center'>AORA</p>

        </div>
       
        </Link>
        <Separator className='my-4 border-dotted'/>
        <Navigation/>

    </aside>
  ) 
}

export default SideBar
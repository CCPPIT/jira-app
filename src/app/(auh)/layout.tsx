"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

type Props = {
    children:React.ReactNode
}

const layout = ({children}: Props) => {
  return (
    <main className='bg-neutral-100 min-h-screen'>
      <div className='mx-auto max-w-screen-2xl p-4'>
        <nav className='flex items-center justify-between'>
        <div className='flex items-center'>
      <Image src={"/logo.svg"} alt='logo' width={100} height={10}/>
      <span className='text-xl font-bold'>Aora</span>
     

      </div>
      <div className='flex items-center gap-2'>
        <Button variant={"secondary"}> Signup</Button>
      </div>

        </nav>
        <div className='w-full h-screen flex items-center justify-center'>
        {children}

        </div>
       
     

      </div>
      
    


    
      </main>
  )
}

export default layout
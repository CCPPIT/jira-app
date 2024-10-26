import UserButton from '@/features/auth/compnonets/user-button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    children:React.ReactNode
}

const StandaloneLayout = ({children}: Props) => {
  return (
    <main className='bg-neutral-100 min-h-screen'>
        <div className='mx-auto max-w-screen-2xl p-4'>
            <nav className='flex justify-between items-center h-[73px]'>
                <Link href={"/"}>
                <div className='flex'>
        <Image  src={"/logo.svg"} alt='logo'  width={100} height={48}/>

         <p className=' flex items-center text-xl font-bold gap-x-0 text-center'>AORA</p>

        </div>
                </Link>
                <UserButton/>
            </nav>     
        <div className='flex flex-col items-center justify-center py-4'>{children}</div>



        </div>

    </main>
   
  )
}

export default StandaloneLayout
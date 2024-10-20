"use client"
import DottedSeparator from '@/components/dotted-seprator'
import {FcGoogle} from "react-icons/fc"
import {FaGithub} from "react-icons/fa"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React from 'react'
import Link from 'next/link'

type Props = {}

const SignUpCard= (props: Props) => {
  return (

    
    <Card className=' h-full md:w-[487px] border-none shadow-none px-7'>
        <CardHeader className='flex items-center justify-center text-center'>
            <CardTitle className='text-2xl'>
                Sign Up
            </CardTitle>
            <CardDescription> 
                By signing up, you agree to our{" "}
                <Link href={"/privacy"}>
                <span className='text-blue-700'>Privacy Policy</span>
                </Link>{" "}
                and{" "}
                <Link href={"/terms"}>
                <span className='text-blue-700'>Terms of Service</span>
                </Link>
            </CardDescription>
        </CardHeader>
        <div className='px-7'>
            <DottedSeparator/>
        </div>
        <CardContent className='px-7'>
            <form className='space-y-4 p-2'>
            <Input
                required
                type='text'
                value={""}
                onChange={()=>{}}
                placeholder='Enter your name'
                disabled={false}
                />
                <Input
                required
                type='email'
                value={""}
                onChange={()=>{}}
                placeholder='Enter Email'
                disabled={false}
                />
                <Input
                required
                type='password'
                value={""}
                onChange={()=>{}}
                placeholder='Enter Password'
                disabled={false}
                min={8}
                max={256}
                />
                <Button size={"lg"} disabled={false} className='w-full'>Login</Button>

            </form>

        </CardContent>
        <div className='px-7 mb-2 p-2'>
          <DottedSeparator/>
        </div>
        <CardContent className='px-7 flex flex-col gap-4'>
            <Button variant={"secondary"} size={"lg"} disabled={false} className='w-full'> 
                <FcGoogle className='mr-2 size-5' />
                Login with Google</Button>
            <Button variant={"secondary"} size={"lg"} disabled={false} className='w-full'>
                <FaGithub className='mr-2 size-5'/>
                Login with Github</Button>

        </CardContent>

    </Card>
    
  )
}

export default SignUpCard
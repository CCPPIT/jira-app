"use client"
import {z}from "zod"
import {zodResolver}from"@hookform/resolvers/zod"
import DottedSeparator from '@/components/dotted-seprator'
import {FcGoogle} from "react-icons/fc"
import {FaGithub} from "react-icons/fa"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import { loginSchema } from "../schemas"
import { useLogin } from "../api/use-login"

type Props={

}

const SignInCard = (props: Props) => {
    const {mutate,isPending}=useLogin()
    const form=useForm<z.infer<typeof loginSchema>>({
        resolver:zodResolver(loginSchema),
        defaultValues:{
            email:"",
            password:"",
        }
    })
    const onSubmit=(values:z.infer<typeof loginSchema>)=>{
        mutate({json:values})
    }
  return (

    <Card className='h-full md:w-[487px] border-none shadow-none px-7'>
    <CardHeader className='flex items-center justify-center text-center'>
        <CardTitle className='text-2xl'>
            Welcome Back!
        
        </CardTitle>
       
    </CardHeader>
    <div className='px-7'>
        <DottedSeparator className='w-full' dotSize='10px' gapSize='5px'/>
    </div>
    <CardContent className='px-7'>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-2'>
            <FormField 
            control={form.control}
            name="email"
            
            render={({field})=>(
             <FormItem>
             <FormControl>

                
            <Input
            type="email"
        
            placeholder='Enter Email'
            {...field}
            />
             </FormControl>
             <FormMessage/>
                </FormItem>

            )}
            />
             <FormField 
            control={form.control}
            name="password"
            render={({field})=>(
             <FormItem>
             <FormControl>

                
            <Input
            type="password"
        
            placeholder='Enter Password'
            {...field}
            />
             </FormControl>
             <FormMessage/>
                </FormItem>

            )}
            />
         
         
            <Button size={"lg"} disabled={isPending} className='w-full'>Login</Button>

        </form>
        </Form>

    </CardContent>
    <div className='px-7 mb-2 p-2'>
      <DottedSeparator/>
    </div>
    <CardContent className='px-7 flex flex-col gap-4'>
        <Button variant={"secondary"} size={"lg"} disabled={isPending} className='w-full'> 
            <FcGoogle className='mr-2 size-5' />
            Login with Google</Button>
        <Button variant={"secondary"} size={"lg"} disabled={isPending} className='w-full'>
            <FaGithub className='mr-2 size-5'/>
            Login with Github</Button>

    </CardContent>
    <div className="w-full px-7">
        <DottedSeparator/>

    </div>
    <CardContent className="p-7 flex items-center justify-center">
        <p>
            Don&apos;t have an account?
            <Link href={"/sign-up"}>
            <span className="text-blue-700">&nbsp;Sign Up</span>

            </Link>
        </p>

    </CardContent>

</Card>
   
  )
}

export default SignInCard
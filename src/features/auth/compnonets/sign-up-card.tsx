"use client"
import DottedSeparator from '@/components/dotted-seprator'
import {FcGoogle} from "react-icons/fc"
import {FaGithub} from "react-icons/fa"
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { registerSchema } from '../schemas'
import { useRegister } from '../api/use-register'

type Props = {}


const SignUpCard= (props: Props) => {
    const {mutate,isPending}=useRegister()
    const form=useForm<z.infer<typeof registerSchema>>({
        resolver:zodResolver(registerSchema),
        defaultValues:{
            name:"",
            email:"",
            password:"",


        }
    })
    const onSubmit=(values:z.infer<typeof registerSchema>)=>{
      mutate({json:values})
    }
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
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-2'>
        <FormField 
            control={form.control}
            name="name"
            render={({field})=>(
             <FormItem>
             <FormControl>

                
            <Input
            type="text"
        
            placeholder='Enter your name'
            {...field}
            />
             </FormControl>
             <FormMessage/>
                </FormItem>

            )}
            />
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
         
         
            <Button size={"lg"} disabled={isPending} className='w-full'>Register</Button>

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
            Already have an account?
            <Link href={"/sign-in"}>
            <span className="text-blue-700">&nbsp;Sign In</span>

            </Link>
        </p>

    </CardContent>


    </Card>
    
  )
}

export default SignUpCard
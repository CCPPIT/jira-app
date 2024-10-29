"use client"
import DottedSeparator from '@/components/dotted-seprator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React from 'react'
import { useWorkspaceId } from '../hooks/use-workspace-id'
import { useInviteCode } from '../hooks/use-invite-code'
import { useJoinWorkspace } from '../api/use-join-workspace'
import { useRouter } from 'next/navigation'

type Props = {
    initialValues:{
        name:string
    },
    
}

const JoinWorkspaceForm = ({initialValues}: Props) => {
    const router=useRouter()
    const workspaceId=useWorkspaceId();
    const inviteCode=useInviteCode();
    const {mutate,isPending}=useJoinWorkspace();
    const onSubmit=()=>{
        mutate({
            param:{workspaceId},
            json:{code:inviteCode}
        },{
            onSuccess:({data})=>{
                router.push(`/workspaces/${data.$id}`)


            }
        })

    }
  return (
    <div>
        <Card className='w-full h-full border-none shadow-none'>
            <CardHeader className='p-7'>
                <CardTitle className='text-xl font-bold'>Join workspace</CardTitle>
                <CardDescription>You&apos; been invited to join <strong>{initialValues.name}</strong> workspace</CardDescription>
            </CardHeader>
            <div className='px-7'>
            <Separator className="border-dotted border-2 border-neutral-500"/>

            </div>
            <CardContent className='p-7'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-2'>
                    <Button 
                    size={"lg"}
                    variant={"secondary"}
                    className='w-full lg:w-fit'
                    asChild
                    type="button"
                    disabled={isPending}
                    >
                        <Link href={"/"}>
                        Cancel
                        </Link>
                       

                    </Button >
                    <Button 
                    type="button"
                    size={"lg"}
                    variant={"destructive"}
                    className='w-full lg:w-fit'
                    onClick={onSubmit}
                    disabled={isPending}
                    >
                        Join Workspace

                    </Button>

                </div>

            </CardContent>

        </Card>
    </div>
  )
}

export default JoinWorkspaceForm
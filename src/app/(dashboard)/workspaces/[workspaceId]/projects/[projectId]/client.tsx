"use client"
import React from 'react'
import { Button } from '@/components/ui/button';
import { getCurrent } from '@/features/auth/queries'
import ProjectAvatar from '@/features/projects/components/project-avatar';
import { getProject } from '@/features/projects/queires';
import TaskViewSwitcher from '@/features/tasks/components/task-view-switcher';
import { PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useProjectId } from '@/features/projects/hooks/use-project-id';
import { useGetProject } from '@/features/projects/api/use-get-project';
import PageLoader from '@/components/page-loader';
import PageError from '@/components/page-error';

type Props = {}

const ProjectIdClient = (props: Props) => {
    const projectId=useProjectId();
    const {data,isLoading}=useGetProject({projectId})
    if(isLoading){
        return <PageLoader/>
    }
    if(!data){
        return <PageError message='Project Not Found'/>
    }


  return (
    <div className='flex flex-col gap-y-4'>
    <div className='flex items-center justify-between'>
        <div className='flex items-center gap-x-2'>
            <ProjectAvatar name={data.name} 
            image={data.imageUrl}
            className='size-8'
            />
            <p className='text-lg font-semibold'>{data.name}</p>

        </div>
        <div>
            <Button variant={"destructive"} size={"sm"} asChild>
                <Link href={`/workspaces/${data.workspaceId}/projects/${data.$id}/settings`}>
                
                <PencilIcon className='size-4 mr-2'/>
                Edit Project
                </Link>
            </Button>
        </div>

    </div>
    <TaskViewSwitcher hideProjectFilter/>
</div>
  )
}

export default ProjectIdClient
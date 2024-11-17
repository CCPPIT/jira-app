import { Button } from '@/components/ui/button';
import { getCurrent } from '@/features/auth/queries'
import ProjectAvatar from '@/features/projects/components/project-avatar';
import { getProject } from '@/features/projects/queires';
import TaskViewSwitcher from '@/features/tasks/components/task-view-switcher';
import { PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import ProjectIdClient from './client';

type Props = {
    params:{
        projectId:string
    }
}

const ProjectIdPage =async ({params}: Props) => {
    const user=await getCurrent();
    if(!user) redirect("/sign-in");
 
  return <ProjectIdClient/>
}

export default ProjectIdPage
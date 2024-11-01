"use client"
import { Card, CardContent } from '@/components/ui/card'
import { useGetMembers } from '@/features/members/api/use-get-member'
import { useGetProjects } from '@/features/projects/api/use-get-projects'
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspace'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { Loader } from 'lucide-react'
import React from 'react'
import { CreateTaskForm } from './create-task-form'

type Props = {
  onCancel:()=>void
}

const CreateTaskFormWrapper = ({onCancel}: Props) => {
  const workspaceId=useWorkspaceId();
  const {data:projects,isLoading:isLoadingProjects}=useGetProjects({workspaceId});
  const {data:members,isLoading:isLoadingMembers}=useGetMembers({workspaceId})
  const projectOptions=projects?.documents.map((project)=>({
    id:project.$id,
    name:project.name,
    imageUrl:project.imageUrl
  }));
  const memberOptions=members?.documents.map((member)=>({
    id:member.$id,
    name:member.name,
  }));
  const isLoading=isLoadingProjects||isLoadingMembers;
  if(isLoading){
    return (
    <Card className='w-full h-[714px] border-none shadow-none'>
      <CardContent className='flex items-center justify-center h-full'>
        <Loader className='size-5 animate-spin text-muted-foreground'/>
      </CardContent>
    </Card>
    )
  }
 return(
  <CreateTaskForm
  onCancel={onCancel}
  projectOptions={projectOptions??[]}
  memberOptions={memberOptions??[]}
  />

 )
  
}

export default CreateTaskFormWrapper
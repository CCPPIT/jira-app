"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useConfirm } from '@/hooks/use-confirm'
import { ExternalLinkIcon, PencilIcon, TrashIcon } from 'lucide-react'
import React from 'react'
import { useDeleteTask } from '../api/use-delete-task'
import { useRouter } from 'next/navigation'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useEditTaskModal } from '../hooks/use-edit-task-modal'

type Props = {
    id:string,
    projectId:string,
    children:React.ReactNode
}

const TaskActions = ({id,projectId,children}: Props) => {
    const workspaceId=useWorkspaceId()
    const {open}=useEditTaskModal()
    const router=useRouter();
    const [ConfirmDialogDelete,confirm]=useConfirm(
        "task Delete",
        "This action cannot be undon",
        "destructive"
    );
    const {mutate,isPending}=useDeleteTask();
    const onDelete=async()=>{
        const ok= await confirm();
        if(!ok)return ;
        mutate({param:{taskId:id}})
    }
    const onOpenProject=()=>{
        router.push(`/workspaces/${workspaceId}/projects/${projectId}`)
    }
    const onOpenTask=()=>{
        router.push(`/workspaces/${workspaceId}/tasks/${id}`)
    }
  return (
    <div className='flex justify-end'>
        <ConfirmDialogDelete/>
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48'>
                <DropdownMenuItem 
                disabled={false}
                onClick={onOpenTask}
                className='font-medium p-[10px]'
                >
                    <ExternalLinkIcon className='size-4 mr-2 stroke-2'/>
                    Task Details
                </DropdownMenuItem>
                <DropdownMenuItem 
                disabled={false}
                onClick={()=>open(id)}
                className='font-medium p-[10px]'
                >
                    <PencilIcon className='size-4 mr-2 stroke-2'/>
                    Edit Task
                </DropdownMenuItem>
                <DropdownMenuItem 
                disabled={false}
                onClick={onOpenProject}
                className='font-medium p-[10px]'
                >
                    <ExternalLinkIcon className='size-4 mr-2 stroke-2'/>
                    Open Project
                </DropdownMenuItem>
                <DropdownMenuItem 
                disabled={isPending}
                onClick={onDelete}
                className='text-amber-700 focus:text-amber-700 font-medium p-[10px]'
                >
                    <TrashIcon className='size-4 mr-2 stroke-2'/>
                    Delete Task
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default TaskActions
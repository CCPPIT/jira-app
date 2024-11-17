import React from 'react'
import { Task } from '../types'
import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import OverViewProperty from './overview-property'
import MemberAvatar from '@/features/members/components/member-avatar'
import TaskDate from './task-date'
import { Badge } from '@/components/ui/badge'
import { snakCaseToTitleCas } from '@/lib/utils'
import { table } from 'console'
import { useEditTaskModal } from '../hooks/use-edit-task-modal'

type Props = {
    task:Task
}

const TaskOverView = ({task}: Props) => {
    const {open}=useEditTaskModal();
  return (
    <div className='flex flex-col gap-y-4 col-span-1'>
        <div className='bg-muted rounded-lg p-4'>
            <div className='flex items-center justify-between'>

           
            <p className='text-lg font-semibold'>
              Overview
            </p>
            <Button
            size={"sm"}
            variant={"destructive"}
            onClick={()=>open(task.$id)}
            >
                    <PencilIcon className='size-4 mr-2'/>
                    Edit
                </Button>


        </div>
        <Separator className='my-4'/>
        <div className='flex flex-col gap-y-4'>
            <OverViewProperty label='Assignee'>
                <MemberAvatar
                name={task.assignee.name}
                className='size-6'
                />
                <p className='text-sm font-medium'>{task.assignee.name}</p>

            </OverViewProperty>
            <OverViewProperty label='Due Date'>
                <TaskDate value={task.dueDate} className='text-sm font-medium'/>

            </OverViewProperty>
            <OverViewProperty label='Status'>
                <Badge variant={task.status}>
                    {snakCaseToTitleCas(task.status)}

                </Badge>

            </OverViewProperty>


        </div>
        </div>
    </div>
  )
}

export default TaskOverView
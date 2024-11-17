import { getCurrent } from '@/features/auth/queries'
import TaskViewSwitcher from '@/features/tasks/components/task-view-switcher';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

const TasksPage =async (props: Props) => {
    const user=await getCurrent();
    if(!user) redirect('/sign-in')
  return (
    <div className='flex flex-col h-full'>
        <TaskViewSwitcher/>
    </div>
  )
}

export default TasksPage
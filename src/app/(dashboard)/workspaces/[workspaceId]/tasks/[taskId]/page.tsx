import { getCurrent } from '@/features/auth/queries'
import { redirect } from 'next/navigation';
import React from 'react'
import TaskIdClient from './client';

type Props = {}

const TaskIdPage = async(props: Props) => {
    const user=await getCurrent();
    if(!user) redirect("/sign-in");
  return <TaskIdClient/>
  
}

export default TaskIdPage
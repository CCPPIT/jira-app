import { getCurrent } from '@/features/auth/actions'
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

const WorkspaceIdPage =async (props: Props) => {
    const user= await getCurrent();
    if(!user)redirect("/sign-in")
  return (
    <div>WorkspaceIdPage</div>
  )
}

export default WorkspaceIdPage
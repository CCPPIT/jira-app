import { getCurrent } from '@/features/auth/queries'
import MemebersList from '@/features/workspaces/components/members-list';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

const WorkspaceIdMemberPage = async(props: Props) => {
    const user=await getCurrent();
    if(!user) redirect("/sign-in");

  return (
    <div className='w-full lg:max-w-xl'>
        <MemebersList/>
    </div>
  )
}

export default WorkspaceIdMemberPage
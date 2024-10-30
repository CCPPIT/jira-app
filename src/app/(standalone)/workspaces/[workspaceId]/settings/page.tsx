
import { getCurrent } from '@/features/auth/queries'
import { getWorkspace } from '@/features/workspaces/queries'
import EditWorkspaceForm from '@/features/workspaces/components/edit-workspace-form'
import { redirect } from 'next/navigation'
import React from 'react'
interface WorkspaceIdSettingsPageProps {
    params:{
        workspaceId:string
    }
}

const workspaceIdSettingsPage = async({params}: WorkspaceIdSettingsPageProps) => {
    const user= await getCurrent()
    if(!user) redirect("/sign-in")
        const initialValues=await getWorkspace({workspaceId: params.workspaceId});
    if(!initialValues){
        redirect(`/workspaces/${params.workspaceId}`)
    }

  return (
    <div className='w-full lg:max-w-xl'>
        <EditWorkspaceForm initialValues={initialValues}/>
    </div>
  )
}

export default workspaceIdSettingsPage
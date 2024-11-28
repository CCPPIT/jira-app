
import { getCurrent } from '@/features/auth/queries'
import { getWorkspace } from '@/features/workspaces/queries'
import EditWorkspaceForm from '@/features/workspaces/components/edit-workspace-form'
import { redirect } from 'next/navigation'
import React from 'react'
import { WorkspaceIdSettingsClient } from './client'
interface WorkspaceIdSettingsPageProps {
    params:{
        workspaceId:string
    }
}

const workspaceIdSettingsPage = async({params}: WorkspaceIdSettingsPageProps) => {
    const user= await getCurrent()
    if(!user) redirect("/sign-in")
  

  return <WorkspaceIdSettingsClient/>
    
  
}

export default workspaceIdSettingsPage
"use client"
import React from 'react'
import { useCreateProjectModal } from '@/features/projects/hooks/use-create-project-modal'
import ResponsiveModal from '@/components/responsive-modal'
import { CreateProjectForm } from './create-project-form'
import { CreateWorkspaceForm } from '@/features/workspaces/components/create-workspace-form'

type Props = {}

const CreateProjectModal = (props: Props) => {
    const {isOpen,setIsOpen,close}=useCreateProjectModal()
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
        <CreateProjectForm onCancel={close}/>
    </ResponsiveModal>
  )
}

export default CreateProjectModal
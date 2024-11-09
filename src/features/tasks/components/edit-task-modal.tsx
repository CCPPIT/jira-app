"use client"
import ResponsiveModal from '@/components/responsive-modal'
import React from 'react'
import { useCreateTaskModal } from '../hooks/use-create-task-modal'
import { useEditTaskModal } from '../hooks/use-edit-task-modal'
import EditTaskFormWrapper from './edit-task-form-wrapper'

type Props = {}

const EditTaskModal = (props: Props) => {
    const {TaskId,close}=useEditTaskModal();
  return (
   <ResponsiveModal open={!!TaskId} onOpenChange={close}>
    {TaskId&&(
      <EditTaskFormWrapper id={TaskId} onCancel={close}/>


    )}

   </ResponsiveModal>
  )
}

export default EditTaskModal
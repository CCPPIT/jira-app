"use client";
import ResponsiveModal from '@/components/responsive-modal'
import { CreateWorkspaceForm } from './create-workspace-form'
import { useCreateWorkspaceModal } from '@/features/workspaces/hooks/use-create-workspace-modal'

type Props = {}

const CreateWorkspaceModal = (props: Props) => {
    const {isOpen,setIsOpen,close}=useCreateWorkspaceModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
        <CreateWorkspaceForm onCancel={close}/>
    </ResponsiveModal>
  )
}

export default CreateWorkspaceModal
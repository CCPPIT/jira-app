import { getCurrent } from '@/features/auth/queries'
import { UpdateProjectForm } from '@/features/projects/components/edit-project-form'
import { getProject } from '@/features/projects/queires'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params:{
        projectId:string

    }
 
}

const ProjectIdSettingPage =async ({params}: Props) => {
    const user=await getCurrent();
    if(!user) redirect("/sign-in");
   const  initaiValues=await getProject({
    projectId:params.projectId
   })
//    if(!initaiValues){
//     throw new Error("Project not found")
//    }
  return (
    <div className='w-full lg:max-w-xl'>
        <UpdateProjectForm initialValues={initaiValues}/>
    </div>
  )
}

export default ProjectIdSettingPage
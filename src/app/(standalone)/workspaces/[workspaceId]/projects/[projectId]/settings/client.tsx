"use client"
import PageError from '@/components/page-error';
import PageLoader from '@/components/page-loader';
import { useGetProject } from '@/features/projects/api/use-get-project';
import { UpdateProjectForm } from '@/features/projects/components/edit-project-form';
import { useProjectId } from '@/features/projects/hooks/use-project-id'
import React from 'react'

type Props = {}

const ProjectIdSettingsClinet = (props: Props) => {
    const projectId=useProjectId();
    const {data:initialValues,isLoading}=useGetProject({projectId});
    if(isLoading){
        return <PageLoader/>
    }
    if(!initialValues){
        return <PageError message='Project Not Found'/>
    }
  return (
    <div className='w-full lg:max-w-xl'>
        <UpdateProjectForm initialValues={initialValues}/>

    </div>
  )
}

export default ProjectIdSettingsClinet
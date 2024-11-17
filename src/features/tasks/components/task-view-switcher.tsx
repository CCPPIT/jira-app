"use client"
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader, PlusIcon } from 'lucide-react'
import {useQueryState}from "nuqs"
import React, { useCallback } from 'react'
import { useCreateTaskModal } from '../hooks/use-create-task-modal'
import { useGetTask } from '../api/use-get-tasks'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import DataFilters from './data-filters'
import { useTaskFilters } from '../hooks/use-task-filters'
import { DataTable } from './data-table'
import {columns}from "@/features/tasks/components/columns"
import DataKanBan from './data-kanban'
import { TaskStatus } from '../types'
import { useBulkUpdateTasks } from '../api/use-bulk-update-tasks'
import DataCalendar from './data-calendar'
import './data-calendar.css'

type Props = {
    hideProjectFilter?:boolean

}


const TaskViewSwitcher = ({hideProjectFilter}: Props) => {
    const [{status,projectId,assigneeId,dueDate,search},setFilters]=useTaskFilters()
    const {mutate:blukupdate}=useBulkUpdateTasks();
    const [view,setView]=useQueryState("task-view",{
        defaultValue:"table"
    })
    const workspaceId=useWorkspaceId();
    const {data:tasks,isLoading:isLoadingTasks}=useGetTask({workspaceId,
        projectId,
        status,
        assigneeId,
        search,
        dueDate

    })

    const {open}=useCreateTaskModal();
    const onKanbanChange=useCallback((tasks:{$id:string,status:TaskStatus,position:number}[])=>{
        blukupdate({json:{tasks}})

    },[blukupdate])
  return (
    <Tabs
    defaultValue={view}
    onValueChange={setView}
     className='flex-1 w-full border rounded-lg'>
        <div className='h-full flex flex-col overflow-auto p-4'>
            <div className='flex flex-col gap-y-2 lg:flex-row justify-between items-center'>
            <TabsList className='w-full lg:w-auto'>
                <TabsTrigger className='h-8 w-full lg:w-auto'
                value='table'
                >
                    Table
                </TabsTrigger>
                <TabsTrigger className='h-8 w-full lg:w-auto'
                value='kanban'
                >
                    Kanban
                </TabsTrigger>
                <TabsTrigger className='h-8 w-full lg:w-auto'
                value='calender'
                >
                    Calendar
                </TabsTrigger>
                
            </TabsList>
            <Button
            onClick={open}
            className='w-full lg:w-auto'
             variant={"destructive"}
            size={"sm"}
            >
                <PlusIcon className='size-4 mr-2'/>
                New

            </Button>

            </div>
            <Separator className='my-4'/>
            <DataFilters hideProjectFilter={hideProjectFilter}/>
            <Separator className='my-4'/>
            {isLoadingTasks?(
                <div className='w-full border rounded-lg h-[200px] flex flex-col items-center justify-center'>
                  <Loader className='size-5 animate-spin text-muted-foreground'/>
                </div>
            ):(
                 <>
                 <TabsContent value='table' className='mt-0'>
                     <DataTable columns={columns} data={tasks?.documents??[]} />
                     
                 </TabsContent>
                 <TabsContent value='kanban' className='mt-0'>
                    <DataKanBan onChange={onKanbanChange} data={tasks?.documents??[]}/>
                     
                 </TabsContent>
                 <TabsContent value='calender' className='mt-0 h-full pb-4'>
                <DataCalendar data={tasks?.documents??[]}/>
                     
                 </TabsContent>
                 </>
     

            )
            }
           
       

        </div>
        
    </Tabs>
  )
}

export default TaskViewSwitcher
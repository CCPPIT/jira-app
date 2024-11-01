"use client"
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PlusIcon } from 'lucide-react'
import React from 'react'
import { useCreateTaskModal } from '../hooks/use-create-task-modal'

type Props = {}

const TaskViewSwitcher = (props: Props) => {
    const {open}=useCreateTaskModal();
  return (
    <Tabs className='flex-1 w-full border rounded-lg'>
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
                    Calender
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
            {/** Add Filters */}
            <Separator className='my-4'/>
            <>
            <TabsContent value='table' className='mt-'>
                Data table
                
            </TabsContent>
            <TabsContent value='kanban' className='mt-'>
                Data kanban
                
            </TabsContent>
            <TabsContent value='calender' className='mt-'>
                Data Calender
                
            </TabsContent>
            </>

       

        </div>
        
    </Tabs>
  )
}

export default TaskViewSwitcher
import { ProjectAnalyticsResponseType } from '@/features/projects/api/use-get-project-analytics'
import React from 'react'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { AnalyticsCard } from './analytics-card'
import { Separator } from './ui/separator'



export const Analytics = ({data}:ProjectAnalyticsResponseType) => {

  return (
    <ScrollArea className='border rounded-lg w-full whitespace-nowrap shrink-0'>
        <div className='flex flex-row w-full'>
            <div className='flex items-center flex-1'>
                <AnalyticsCard
                title='Total tasks'
                value={data.taskCount}
                variant={data.taskDifference>0?"up":"down"}
                increasseValue={data.taskDifference}
                />
                <Separator orientation='vertical'/>

            </div>
            
            <div className='flex items-center flex-1'>
                <AnalyticsCard
                title='Assigned Tasks'
                value={data.assigneedTaskCount}
                variant={data.assigneedDifference>0?"up":"down"}
                increasseValue={data.assigneedDifference}
                />
                 <Separator orientation='vertical'/>

            </div>
            <div className='flex items-center flex-1'>
                <AnalyticsCard
                title='Completed Tasks'
                value={data.completedTaskCount}
                variant={data.completedTaskDiffrenece>0?"up":"down"}
                increasseValue={data.completedTaskDiffrenece}
                />
                 <Separator orientation='vertical'/>

            </div>
            <div className='flex items-center flex-1'>
                <AnalyticsCard
                title='Overdue Tasks'
                value={data.overdueTaskCount}
                variant={data.overdueTaskDiffrenece>0?"up":"down"}
                increasseValue={data.overdueTaskDiffrenece}
                />
                <Separator orientation='vertical'/>

            </div>
            <div className='flex items-center flex-1'>
                <AnalyticsCard
                title='Incomplete Tasks'
                value={data.incompleteTasksCount}
                variant={data.incompleteTaskDifference>0?"up":"down"}
                increasseValue={data.incompleteTaskDifference}
                />
                <Separator orientation='vertical'/>

            </div>

        </div>
        <ScrollBar orientation='horizontal'/>

    </ScrollArea>
  )
}


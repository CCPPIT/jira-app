import React, { useCallback, useEffect, useState } from 'react'
import { Task, TaskStatus } from '../types'
import {DragDropContext, Draggable, Droppable, DropResult}from "@hello-pangea/dnd"
import KanBanColumnHeader from './kanban-column-header'
import KanBanCard from './kanban-card'

interface Props {
    data:Task[]
    onChange:(tasks:{$id:string,status:TaskStatus,position:number}[])=>void
}
const boards:TaskStatus[]=[
    TaskStatus.BACKLOG,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.IN_REVIEW,
    TaskStatus.TODO
]
type TaskState={
    [key in TaskStatus]:Task[]
}

const DataKanBan = ({data,onChange}: Props) => {
    const [tasks,setIsTask]=useState<TaskState>(()=>{
        const initialTasks:TaskState={
            [TaskStatus.BACKLOG]:[],
            [TaskStatus.DONE]:[],
            [TaskStatus.IN_PROGRESS]:[],
            [TaskStatus.IN_REVIEW]:[],
            [TaskStatus.TODO]:[]
        };
        data.forEach((task)=>{
            initialTasks[task.status].push(task)
        });
        Object.keys(initialTasks).forEach((status)=>{
            initialTasks[status as TaskStatus].sort((a,b)=>a.position - b.position)
        });
        return initialTasks;
    })
    useEffect(()=>{
        const newTasks:TaskState={
            [TaskStatus.BACKLOG]:[],
            [TaskStatus.DONE]:[],
            [TaskStatus.IN_PROGRESS]:[],
            [TaskStatus.IN_REVIEW]:[],
            [TaskStatus.TODO]:[]
        };
        data.forEach((task)=>{
            newTasks[task.status].push(task)
        });
        Object.keys(newTasks).forEach((status)=>{
            newTasks[status as TaskStatus].sort((a,b)=>a.position - b.position);
        });
        setIsTask(newTasks)
    },[data])
    const onDragEnd=useCallback((result:DropResult)=>{
        if(!result.destination)return;
        const {source,destination}=result;
        const sourceStatus=source.droppableId as TaskStatus;
        const destStatus=destination.droppableId as TaskStatus;
        let updatePayload:{$id:string;status:TaskStatus;position:number}[]=[];
        setIsTask((prevTask)=>{
            const newTasks={...prevTask};
            // Safely remove the  task from the source column
            const sourceColumn=[...newTasks[sourceStatus]];
            const[movedTask]=sourceColumn.splice(source.index,1);
            // If there's no moved task (shouldn't happen,but just in case),return the  previous state
            if(!movedTask){
                console.error ("No Task Found At The Source Index ");
                return prevTask
            }
          // Creat a new task object with potentially update status.
          const updateMovedTask=sourceStatus !== destStatus
          ?{...movedTask,status:destStatus}
          :movedTask;
          // Update the source column
          newTasks[sourceStatus]=sourceColumn;
          // add the task to destiantion column
          const destColumn=[...newTasks[destStatus]]
          destColumn.splice(source.index,0,updateMovedTask);
          newTasks[destStatus]=destColumn;
          // Prepare minimal update payload
          updatePayload=[];
          //Always update the moved task
          updatePayload.push({
            $id:updateMovedTask.$id,
            status:destStatus,
            position:Math.min((destination.index+1)*1000,1_1000_000)
          });
          // Update position for affected task in the destaintion column
          newTasks[destStatus].forEach((task,index)=>{
            if(task&& task.$id !==updateMovedTask.$id){
                const newPosition=Math.min((index+1)*1000,1_000_000);
                if(task.position !==newPosition){
                    updatePayload.push({
                        $id:task.$id,
                        status:destStatus,
                        position:newPosition
                    })
                }

            }
          })
          // If task the moved bettwen column,update positions in source column
          if(sourceStatus !==destStatus){
            newTasks[sourceStatus].forEach((task,index)=>{
                if(task){
                    const newPosition=Math.min((index+1)*1000 , 1_000_000);
                    if(task.position !==newPosition){
                        updatePayload.push({
                            $id:task.$id,
                            status:sourceStatus,
                            position:newPosition
                        })
                    }
                }
            })
          }
          return newTasks

        });
        onChange(updatePayload)
    },[onChange])
  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className='flex overflow-x-auto'>
            {boards.map((board)=>{
                return(
                    <div key={board} className='flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]'>
                    <KanBanColumnHeader
                    board={board}
                    taskCount={tasks[board].length}
                    />
                    <Droppable droppableId={board}>
                        {(provided)=>(
                            <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            
                            className='min-h-[200px] py-1.5'
                            >
                                {tasks[board].map((task,index)=>(
                                    <Draggable
                                    key={task.$id}
                                    draggableId={task.$id}
                                    
                                    index={index}
                                    >
                                        {(provided)=>(
                                            <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            
                                           
                                            >
                                                <KanBanCard task={task}/>
    
                                            </div>
                                        )}
    
                                    </Draggable>
                                ))}
                                {provided.placeholder}
    
                            </div>
    
                        )}
    
                    </Droppable>
    
                </div>

                )
            

            }
                
            )}

        </div>

    </DragDropContext>
  )
}

export default DataKanBan
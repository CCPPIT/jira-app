import React, { useState } from 'react'
import { Task } from '../types'
import {Calendar,dateFnsLocalizer}from "react-big-calendar"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './data-calendar.css'

import {
    format,
    parse,
    startOfWeek,
    subMonths,
    getDay,
    addMonths,
    
}from "date-fns"
import {enUS} from 'date-fns/locale/en-US'
import EventCard from './event-card'
import CustomToolBar from './customtoolbar'
const locales = {
    'en-US': enUS,
  }
const localizer=dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
    
})

type Props = {
    data:Task[]
}

const DataCalendar = ({data}: Props) => {
    const [value,setValue]=useState(
        data.length>0 ?new Date(data[0].dueDate):new Date
    );
    const events=data.map((task)=>({
      start:new Date(task.dueDate),
      end:new Date(task.dueDate),
      title:task.name,
      project:task.project,
      assignee:task.assignee,
      status:task.status,
      id:task.$id
    
    }));
    const handleNavigate=(action:"PREV"|"NEXT"|"TODAY")=>{
      if(action==="PREV"){
        setValue(subMonths(value,1))
      }else if(action=== "NEXT"){
        setValue(addMonths(value,1))
      }else if(action==="TODAY"){
        setValue(new Date())
      }
    }
  return (
    <div>
      <Calendar
      localizer={localizer}
      date={value}
      events={events}
      views={['month']}
      defaultView='month'
      toolbar
      showAllEvents
      className='h-full'
      max={new Date(new Date().setFullYear(new Date().getFullYear() +1))}
      formats={{
        // تعريف تنسيق خاص ليوم الأسبوع
        weekdayFormat: (date, culture, localizer) => 
          // استخدام localizer لتنسيق التاريخ، إذا كان موجودًا
          localizer?.format(date, "EEE", culture) ?? "" // إذا لم يكن localizer موجودًا، استخدم سلسلة فارغة
      }}
      components={{
        eventWrapper:({event})=>(
          <EventCard
          title={event.title}
          assignee={event.assignee}
          project={event.project}
          status={event.status}
          id={event.id}
          />

        ),
        toolbar:()=>(
          <CustomToolBar date={value} onNavigat={handleNavigate}/>
        )
      }}
      
      />
    </div>
  )
}

export default DataCalendar
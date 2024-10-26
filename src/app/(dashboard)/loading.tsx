import { Loader } from 'lucide-react'
import React from 'react'

type Props = {}

const DashboardLoading = (props: Props) => {
  return (
    <div className='h-full min-h-screen flex justify-center items-center'>
        <Loader className='size-6 animate-spin text-muted-foreground'/>
    </div>
  )
}

export default DashboardLoading
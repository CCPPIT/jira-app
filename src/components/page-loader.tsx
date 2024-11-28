import { Loader } from 'lucide-react'
import React from 'react'

type Props = {}

const PageLoader = (props: Props) => {
  return (
    <div className='flex items-center justify-center h-full'>
        <Loader className='size-6 animate-spin text-muted-foreground'/>
    </div>
  )
}

export default PageLoader
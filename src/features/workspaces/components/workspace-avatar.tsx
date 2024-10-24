import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
    image?:string,
    name?:string,
    className?:string
}

const WorkspaceAvatar = ({ className,image,name}: Props) => {
    if(image){
        return(
            <div className={cn('size-10 relative rounded-md overflow-hidden',className)}>
            <Image 
            src={image}
            alt={name!}
             fill className='object-cover'
            />
        </div>

        )
    }
    const avatarFallback=name?.charAt(0).toUpperCase()
  return (
    <Avatar className={cn('size-10 rounded-md',className)}>
        <AvatarFallback className='text-white rounded-md bg-blue-600 font-semibold text-lg uppercase'>
            {avatarFallback}

        </AvatarFallback>
    </Avatar>
    
   
  )
}

export default WorkspaceAvatar
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
    name?:string,
    className?:string,
    image?:string,
    fallbackClassName?:string
}

const ProjectAvatar = ({name,image,className,fallbackClassName}: Props) => {
    if(image){
        return(
            <div className={cn("size-5 rounded-md relative overflow-hidden",className)}>
                <Image
                src={image}
                alt={name!}
                fill className='object-cover'
                />

            </div>
        )
    }
    const avatarFallback=name?.charAt(0).toUpperCase();
  return (
    <Avatar className={cn("size-5 rounded-md",className)}>
        <AvatarFallback className={cn('text-white rounded-md bg-blue-500 font-semibold text-sm uppercase',fallbackClassName)}>
            {avatarFallback}
            
        </AvatarFallback>
    </Avatar>
  )
}

export default ProjectAvatar
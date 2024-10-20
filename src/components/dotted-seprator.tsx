import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    className?:string
    color?:string
    height?:string
    dotSize?:string
    gapSize?:string
    direction?:"horizontal"|"vertical"
}

const DottedSeparator = ({className,color="#d5d",direction="horizontal",dotSize="5px",gapSize="10px",height="2px"}: Props) => {
    const isHorizantal=direction ==="horizontal"
  return (
    <div 
    className={cn(
        isHorizantal?"w-full flex items-center":"h-full flex flex-col items-center",
        className
    )}
    >
        <div className={isHorizantal? "flex-grow" :"flex-grow-0"}
        style={{
            width:isHorizantal ? "100%" : height,
            height:isHorizantal? height :"100%",
            backgroundImage:`radial-gradient(circle,${color} 25%, transparent 25%)`,
            backgroundSize:isHorizantal
            ?`${parseInt(dotSize) + parseInt(gapSize)} px ${height}`
            :`${height} ${parseInt(dotSize) + parseInt(gapSize)} px `,
            backgroundRepeat:isHorizantal? 'repeat-x': 'repeat-y',
            backgroundPosition:"center"
        }}
        />
    </div>
  )
}

export default DottedSeparator
import NavBar from '@/components/navbar'
import SideBar from '@/components/sidebar'
import React from 'react'

type Props = {
    children:React.ReactNode
}

const DashboardLayoutout = ({children}: Props) => {
  return (
    <div className='min-h-screen'>
        <div className='flex w-full h-full'>
            <div className='fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-auto'>
              <SideBar/>
            </div>
            <div className='lg:pl-[264px] w-full'>
               
                <div className='mx-auto max-w-screen-2xl h-full'>
                   {/** NAVBAR */}
                
                  <NavBar/>
               
                <main className='h-full py-8 px-6 flex flex-col'>
                    {children}
                </main>

                </div>
               

            </div>

        </div>
    </div>
  )
}

export default DashboardLayoutout
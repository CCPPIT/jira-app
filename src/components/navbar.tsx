import React from 'react'

type Props = {}

const NavBar = (props: Props) => {
  return (
    <nav className='pt-4 px-6 flex items-center justify-between'>
        <div className='flex-col hidden lg:flex'>
            <h1 className='text-2xl font-semibold'>Home</h1>

        </div>

    </nav>
    
  )
}

export default NavBar
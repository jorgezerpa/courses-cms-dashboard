import React, { PropsWithChildren } from 'react'
import { Sidebar } from '@/commons/Sidebar'

export const MainLayout = ({children}:PropsWithChildren) => {
  return (
    <div className='w-full'>
        <Sidebar />
        <div className='md:ml-64 h-screen overflow-x-hidden transition-all'>
            { children }
        </div>
            
    </div>
  )
}

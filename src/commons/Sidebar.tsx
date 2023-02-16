import React, { useState } from 'react'
import Link from 'next/link'
import { MdHome, MdVideoLibrary, MdQuiz, MdPayment, MdPerson, MdSettings } from 'react-icons/md'
import { IconType } from 'react-icons'

const ITEMS = [
    { title:'home', path:'/', icon:MdHome },
    { title:'courses', path:'/courses', icon:MdVideoLibrary },
    { title:'quizzes', path:'/quizzes', icon: MdQuiz},
    { title:'payments', path:'/payments', icon: MdPayment},
    { title:'user', path:'/user', icon: MdPerson},
    { title:'settings', path:'/settings', icon: MdSettings},
]

const SidebarItem = ({title, path, Icon}:{title:string, path:string, Icon:IconType}) => (
    <li>
        <Link href={path}>
            <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <Icon size={23} color='#777777' />
            <span className="ml-3">{title}</span>
            </div>
        </Link>
    </li>
)

export const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(false)    

    const toggleSidebar = () => setShowSidebar(!showSidebar)

    return (
        <>        
            <button onClick={toggleSidebar} type="button" className={`transition-transform left-3 fixed top-3 ${showSidebar&&'translate-x-60'} bg-white z-50 inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}>
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
            </button>

            <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${!showSidebar && '-translate-x-full'} md:translate-x-0`} aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2">
                    {ITEMS.map((item, index)=>(
                        <div key={item.path+index}>
                            <SidebarItem Icon={item.icon} path={item.path} title={item.title} />
                        </div>
                    ))}
                </ul>
            </div>
            </aside>
        </>
    )
}




// items with notification labels 
{/* <li>
    <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
    <span className="flex-1 ml-3 whitespace-nowrap">Kanban</span>
    <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
    </a>
</li>
<li>
    <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
    <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
    </a>
</li> */}
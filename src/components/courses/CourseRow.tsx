import React, { useState } from 'react'
import { useRouter } from 'next/router'

const ItemOptions = ({id}:{id:number|string}) => {
  const router = useRouter()

  return(
    <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow shadow-gray-500 dark:bg-gray-700">
        <ul className="py-2 px-3 text-sm text-gray-700 dark:text-gray-200" >
          <li className='text-left' onClick={()=>router.push(`/courses/${id}/sections`)}>
            <div className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Ver secciones</div>
          </li>
          <li className='text-left' onClick={()=>router.push(`/courses/${id}/edit`)}>
            <div className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Editar</div>
          </li>
          <li className='text-left'>
            <div className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Eliminar</div>
          </li>
        </ul>
    </div>  
  )

}

export const CourseRow = () => {
  const [showItemOptions, setShowItemOptions] = useState(false)
  const router = useRouter()

  const toggleItemOptions = () => setShowItemOptions(!showItemOptions)

  return (
    <tr>
      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
        <div>
          <h2 className="font-medium text-gray-800 dark:text-white ">Circooles</h2>
          {/* <p className="text-sm font-normal text-gray-600 dark:text-gray-400">getcirooles.com</p> */}
        </div>
      </td>
      <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
        <div className="inline px-3 py-1 text-sm font-normal text-gray-500 bg-gray-100 rounded-full dark:text-gray-400 gap-x-2 dark:bg-gray-800">
          Churned
        </div>
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div>
          <h4 className="text-gray-700 dark:text-gray-200">Design software</h4>
          <p className="text-gray-500 dark:text-gray-400">Super lightweight design app</p>
        </div>
      </td>
      
      <td className="px-4 py-4 text-sm whitespace-nowrap relative">
        <button onClick={toggleItemOptions} className="relative px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
          <div className={`top-0 right-[90%] absolute ${showItemOptions?'block':'hidden'}`}>
            <ItemOptions id="1" />
          </div>
        </button>
      </td>
    </tr>
  )
}
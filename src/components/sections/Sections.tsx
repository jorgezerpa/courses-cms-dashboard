import React, { useEffect } from 'react'
import { CourseRow } from '@/components/courses/CourseRow'
import { SectionsTableHead } from '@/components/sections/SectionsTableHead'
import { useRouter } from 'next/router'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useFetchData } from '@/hooks/useFetchData'
import { routes } from '@/utils/mainApiRoutes';
import { SectionRow } from './SectionRow';

export const Sections = ({ courseId }:{courseId:string}) => {
  const router = useRouter()
  const { isError, isLoading, isSuccess, result } = useFetchData('GET', routes.getSections(courseId) )


  return (
    <section className="container px-4 mx-auto pt-10">
        <div className="sm:flex sm:items-center sm:justify-between">
        <div>
            <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Secciones</h2>
            {/* <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">240 vendors</span> */}
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Some beauty test that you feel good.</p>
        </div>

                {/* TOP RIGHT BUTTONS  */}
        <div className="flex items-center mt-4 gap-x-3">
            <button onClick={()=>router.push(`/courses/${courseId}/sections/create`)} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>agregar sección</span>
            </button>
        </div>
        </div>

        <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 pb-20 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className=" min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <SectionsTableHead />
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {isSuccess && result.sections.map((section:any)=>(
                        <SectionRow key={section.id} section={section} />
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    </section>
  )
}

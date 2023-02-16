import React from 'react'

export const CourseTableHead = () => {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
            Course
        </th>
        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
            Status
        </th>
        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
            About
        </th>
        <th scope="col" className="relative py-3.5 px-4">
            <span className="sr-only">Edit</span>
        </th>
        </tr>
    </thead>
  )
}

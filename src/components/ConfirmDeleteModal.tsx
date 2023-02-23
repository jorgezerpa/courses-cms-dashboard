import React, { useState, useEffect } from 'react'
import { routes } from '@/utils/mainApiRoutes'
import { useFetchDataOnTrigger } from '@/hooks/useFetchDataOnTrigger'
import router from 'next/router'

export const ConfirmDeleteModal = ({toggler, show, elementId, endpoint}:{toggler:()=>void, show:boolean, elementId:string|number, endpoint:'course'|'section'|'lesson' }) => {  

  //USE JEST HERE TO TTEST THAT ALWAYS TAKE THE CORRECT ENDPOINT (VEERYY IMPORTANT!!!!!)
  const [endpointSelected, setEndpointSelected] = useState<(id:string)=>string>(()=>{
    if(endpoint==='course') return routes.deleteCourse  
    if(endpoint==='section') return routes.deleteSection  
    if(endpoint==='lesson') return routes.deleteLesson  
    throw new Error('invalid endpoint prop passed to ConfirmDeleteModal component. You should pass one of the allowed values')
  })
  
  const { isError, isLoading, isSuccess, fireUp } = useFetchDataOnTrigger('DELETE', endpointSelected(elementId as string))

  useEffect(()=>{
    //instead of reload, should refetch the courses and close the modal (let for late, cause this is easier with a global state handler like redux)
    if(isSuccess) router.reload()
  }, [isSuccess])

  const handleDelete = () => {
    fireUp()
  }

  return (
        <div className={`${!show && 'hidden'} z-50 fixed top-0 left-0 bottom-0 right-0 bg-opacity-60 bg-black flex justify-center items-center`}>
          <div className='w-[200px] h-[200px] bg-white'>
              <div onClick={toggler}>cerrar</div>
              <div>seguro que quieres borrar el elemento { elementId }?</div>
              <button type='button' onClick={handleDelete}>
                Eliminar
              </button>
          </div>
        </div>
      )
}

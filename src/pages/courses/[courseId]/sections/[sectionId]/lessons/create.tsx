import React, { SyntheticEvent, useState, useEffect } from 'react'
import { BackButton } from '@/commons/BackButton'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useForm } from '@/hooks/useForm';
import { useFetchDataOnTrigger } from '@/hooks/useFetchDataOnTrigger';
import { RotatingLines } from 'react-loader-spinner';
import { SuccessActionMessage } from '@/components/SuccessActionMessage';
import { ErrorActionMessage } from '@/components/ErrorActionMessage';
import { useRouter } from 'next/router';
import { routes } from '@/utils/mainApiRoutes';

const CreateCourse = () => {
    const router = useRouter()
    const { formRef, getFormInfo } = useForm()
    const {isError, isLoading, isSuccess, fireUp, restartFetch, result} = useFetchDataOnTrigger('POST', routes.createLesson(router.query.sectionId as string))
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    useEffect(()=>{
        if(isSuccess){
            router.push(`/courses/${router.query.courseId}/sections/${router.query.sectionId}/lessons/${result.data.id}`)
        }
        if(isError){
            window.scrollTo({top:0, behavior:'smooth'})
            setShowErrorMessage(true)
        }
    }, [isSuccess, isError])

    
    const handleSubmit = (e:SyntheticEvent) => {
        const [jsonData] = getFormInfo(e)
        fireUp(jsonData)
    }

    const handleSuccessMessage = () => {
        restartFetch()
        formRef.current?.reset()
        setShowSuccessMessage(false)
    }

    const toggleSuccessMessage = () => {setShowSuccessMessage(!showSuccessMessage)}
    const toggleErrorMessage = () => {setShowErrorMessage(!showErrorMessage)}


  return (
    <div className='p-5'>
        <div><BackButton /></div>
        <SuccessActionMessage 
            show={showSuccessMessage} 
            toggler={toggleSuccessMessage} 
            buttonText='limpiar y crear otro'
            text='Lección Creada con Éxito'
            title='¡Perfecto!' 
            handleClick={handleSuccessMessage} 
            />
        <ErrorActionMessage
            show={showErrorMessage}
            toggler={toggleErrorMessage} 
            handleClick={toggleErrorMessage}
        />
        <h3 className="text-2xl my-3 mb-10 font-medium text-gray-800 dark:text-white">Crear Nueva lección</h3>
        <form ref={formRef} className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                      titulo
                  </label>
                  <input name="title" disabled={isSuccess || isLoading} className="disabled:opacity-50 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="My Course Name" />
                </div>
            </div>
            <div className='flex gap-2'>
                <button type='submit' disabled={isLoading || isSuccess} className='transition-all relative disabled:bg-blue-400  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    { !isLoading && 'crear' }
                    <RotatingLines visible={isLoading} width='50' strokeColor='white' />
                </button>
            </div>
        </form>
    </div>
  )
}

export default withPageAuthRequired(CreateCourse)




import React, { SyntheticEvent, useState, useEffect } from 'react'
import { BackButton } from '@/commons/BackButton'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useForm } from '@/hooks/useForm';
import { useFetchDataOnTrigger } from '@/hooks/useFetchDataOnTrigger';
import { RotatingLines } from 'react-loader-spinner';
import { SuccessActionMessage } from '@/components/SuccessActionMessage';
import { ErrorActionMessage } from '@/components/ErrorActionMessage';

const CreateCourse = () => {
    const { formRef, getFormInfo } = useForm()
    const {isError, isLoading, isSuccess, fireUp, restartFetch} = useFetchDataOnTrigger('POST', '/courses')
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    useEffect(()=>{
        if(isSuccess){
            window.scrollTo({top:0, behavior:'smooth'})
            setShowSuccessMessage(true)
            setShowErrorMessage(false)
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
    const handleInputFocus = () => {
        setShowErrorMessage(false)
        setShowSuccessMessage(false)
    }
    

  return (
    <div className='p-5'>
        <div><BackButton /></div>
        <SuccessActionMessage 
            show={showSuccessMessage} 
            toggler={toggleSuccessMessage} 
            buttonText='limpiar y crear otro'
            text='Curso Creado con Éxito'
            title='¡Perfecto!' 
            handleClick={handleSuccessMessage} 
            />
        <ErrorActionMessage
            show={showErrorMessage}
            toggler={toggleErrorMessage} 
            handleClick={toggleErrorMessage}
        />
        <h3 className="text-2xl my-3 mb-10 font-medium text-gray-800 dark:text-white">Create New Course</h3>
        <form ref={formRef} className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Name
                </label>
                <input name="name" disabled={isSuccess || isLoading} className="disabled:opacity-50 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="My Course Name" />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                    Description
                </label>
                <textarea name="description" disabled={isSuccess || isLoading} className="disabled:opacity-50 appearance-none block w-full min-h-[100px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" placeholder="My course Description" />
                {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you had like</p> */}
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



    //ERROR INPUT
{/* <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
        First Name
    </label>
    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
    <p className="text-red-500 text-xs italic">Please fill out this field.</p>
</div> */}



    //SELECT INPUTS | 3 fields row
{/* <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
        City
    </label>
    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
        State
    </label>
    <div className="relative">
        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
        <option>New Mexico</option>
        <option>Missouri</option>
        <option>Texas</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
    </div>
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
        Zip
    </label>
    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" />
    </div>
</div> */}

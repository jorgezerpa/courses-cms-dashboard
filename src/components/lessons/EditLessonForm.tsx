import React, { useState, useEffect, SyntheticEvent } from 'react'
import { useFetchData } from '@/hooks/useFetchData'
import { useForm } from '@/hooks/useForm'
import { routes } from '@/utils/mainApiRoutes'
import router from 'next/router'
import { EditableField } from '../EditableField'
import { useFetchDataOnTrigger } from '@/hooks/useFetchDataOnTrigger'
import { SuccessActionMessage } from '../SuccessActionMessage'
import { ErrorActionMessage } from '../ErrorActionMessage'

export const EditLessonForm = () => {
    const { formRef, getFormInfo } = useForm()
    const { isError, isLoading, isSuccess, result:lesson, refetch } = useFetchData('GET', routes.getSection(router.query.sectionId as string) )
    const {isError:isErrorOnUpdate, isLoading:isLoadingOnUpdate, isSuccess:isSuccessOnUpdate, fireUp, restartFetch} = useFetchDataOnTrigger('PATCH', routes.updateSection(router.query.sectionId as string)) 
    const [initialFormValues, setInitialFormValues] = useState<any>({})
    const [currentFormValues, setCurrentFormValues] = useState<any>({})
    const [wasChanged, setWasChanged] = useState(false)
    const [undo, setUndo] = useState(false)

    useEffect(()=>{ // set form states
        if(isSuccess){
            setInitialFormValues({
                name:lesson.name,
                description:lesson.description
            })
            setCurrentFormValues({
                name:lesson.name,
                description:lesson.description
            })
        }
    }, [isSuccess, lesson])

    useEffect(()=>{ // handle form changes
        let wasChanged = false
        for(let key in currentFormValues){
            if(currentFormValues[key]!==initialFormValues[key]){
                wasChanged = true
                break;
            }
        }
        setWasChanged(wasChanged)
    },[currentFormValues, initialFormValues])

    useEffect(()=>{
        if(isSuccessOnUpdate){
            refetch()
        }
    }, [isSuccessOnUpdate])


    const handleChange = (name:string, value:string) => {
        // update current values and trigger effect
        //this function is passed to EditableField and executed on input change
        const newValues = { ...currentFormValues }
        newValues[name] = value
        setCurrentFormValues(newValues)
    }

    const handleSubmit = (e:SyntheticEvent) => {
        const [ body ] = getFormInfo(e) // tuple -> [json, formData]
        fireUp(body)
    }

    const handleUndo = () => {
        setUndo(!undo)
        setCurrentFormValues(initialFormValues)
    }

  return (
    <section className=''>
        <SuccessActionMessage 
            show={isSuccessOnUpdate} 
            toggler={restartFetch} // in this case, this will set isSuccessOnUpdate to false, so, it is no needed build a new state or a function handler 
            buttonText='entendido'
            title='¡Perfecto!' 
            text='Curso Actualizado con Éxito'
            handleClick={restartFetch} 
            />
        <ErrorActionMessage
            show={isErrorOnUpdate}
            toggler={restartFetch} 
            handleClick={restartFetch}
        />
        { (!isLoading && isSuccess) && (
            <form ref={formRef} className="w-full max-w-lg" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <EditableField triggerUndo={undo} name='name' defaultValue={lesson.name} type='text' setCurrentValue={handleChange}   />
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <EditableField triggerUndo={undo} name='description' defaultValue={lesson.description} type='textarea' setCurrentValue={handleChange}  />
                </div>
                <div className={`${ wasChanged ? 'flex' : 'hidden' } gap-2`}>
                    <button type='submit' className='transition-all relative disabled:bg-blue-400  bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 text-sm rounded'>
                        guardar cambios
                    </button>
                    <button onClick={handleUndo} type='button' className='transition-all relative disabled:bg-red-400  bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 text-sm rounded'>
                        deshacer
                    </button>
                </div>
            </form>
        )}
    </section>
  )
}

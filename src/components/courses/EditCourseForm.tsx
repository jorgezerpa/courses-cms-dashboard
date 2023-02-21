import React, { useState, useEffect, SyntheticEvent } from 'react'
import { useFetchData } from '@/hooks/useFetchData'
import { useForm } from '@/hooks/useForm'
import { routes } from '@/utils/mainApiRoutes'
import router from 'next/router'
import { EditableField } from '../EditableField'

export const EditCourseForm = () => {
    const { formRef, getFormInfo } = useForm()
    const { isError, isLoading, isSuccess, result:course } = useFetchData('GET', routes.getCourse(router.query.CourseId as String) )
    // const {isError, isLoading, isSuccess, fireUp, restartFetch} = useFetchDataOnTrigger('POST', '/courses') 
    const [initialFormValues, setInitialFormValues] = useState<any>({})
    const [currentFormValues, setCurrentFormValues] = useState<any>({})
    const [wasChanged, setWasChanged] = useState(false)

    useEffect(()=>{ // set form states
        if(isSuccess){
            setInitialFormValues({
                name:course.name,
                description:course.description
            })
            setCurrentFormValues({
                name:course.name,
                description:course.description
            })
        }
    }, [isSuccess, course])

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


    const handleChange = (name:string, value:string) => {
        // update current values and trigger effect
        //this function is passed to EditableField and executed on input change
        const newValues = { ...currentFormValues }
        newValues[name] = value
        setCurrentFormValues(newValues)
    }

  return (
    <section className=''>
        { (!isLoading && isSuccess) && (
            <form ref={formRef} className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <EditableField name='name' defaultValue={course.name} type='text' setCurrentValue={handleChange}   />
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <EditableField name='description' defaultValue={course.description} type='textarea' setCurrentValue={handleChange}  />
                </div>
                <div className={`${ wasChanged ? 'flex' : 'hidden' } gap-2`}>
                    <button type='submit' className='transition-all relative disabled:bg-blue-400  bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 text-sm rounded'>
                        guardar cambios
                    </button>
                    <button type='button' className='transition-all relative disabled:bg-red-400  bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 text-sm rounded'>
                        deshacer
                    </button>
                </div>
            </form>
        )}
    </section>
  )
}

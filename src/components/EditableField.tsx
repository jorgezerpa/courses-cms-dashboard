import React, { useRef, useEffect, useState } from 'react'
import { MdEdit } from 'react-icons/md'

export const EditableField = (
    //trigger undo is a boolean used as a switch, every time it change, trigger thw useEffect. Parent has be in charge of toggle this value.
    { name, type='text', defaultValue, setCurrentValue, placeholder='', triggerUndo=false } : { name:string, type?:'text'|'textarea'|'select', defaultValue:string, setCurrentValue?:(label:string, value:string)=>void, placeholder?:string, triggerUndo?:boolean }
) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue)
    const inputRef = useRef<HTMLInputElement>(null)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const selectRef = useRef<HTMLSelectElement>(null)

    const handleUndo = () => {
        if(inputRef.current && type==='text') inputRef.current.value = defaultValue
        if(textAreaRef.current && type==='textarea') textAreaRef.current.value = defaultValue
        if(selectRef.current && type==='select') selectRef.current.value = defaultValue
    }

    useEffect(()=>{
        handleUndo()
    }, [triggerUndo])

  return (
    <>
        { type==='text' && (
            <div className="w-full px-3 flex items-center justify-center">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" htmlFor="grid-last-name">
                    <MdEdit color='#555555' size={25} />
                </label>
                <input 
                    ref={inputRef}
                    onChange={(e)=>{
                        setCurrentValue && setCurrentValue(name, e.currentTarget.value)
                    }}
                    name={name} 
                    defaultValue={defaultValue} 
                    id="grid-last-name" 
                    type={type} 
                    placeholder={placeholder}  
                    className="disabled:opacity-50 appearance-none block w-full bg-none border-none py-3 px-4 leading-tight outline-none  text-2xl font-medium text-gray-800 dark:text-white" 
                />
            </div>
        )}

        { type==='textarea' && (
            <div className="w-full px-3">
                <label className="uppercase tracking-wide text-gray-700 text-sm font-bold mb-2 flex gap-1" htmlFor="grid-password">
                    <MdEdit color='#555555' size={20} />
                    Description
                </label>
                <textarea 
                    ref={textAreaRef}
                    onChange={(e)=>{
                        setCurrentValue && setCurrentValue(name, e.currentTarget.value)
                    }}
                    defaultValue={defaultValue} 
                    name={name} 
                    id="grid-password" 
                    placeholder={placeholder} 
                    className="disabled:opacity-50 appearance-none block w-full min-h-[100px] bg-transparent text-gray-700 border border-none leading-tight focus:outline-none"
                    />
            </div>
        )}

        {type==='select' && (
            <div>
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{name}</label>
                <select
                    ref={selectRef}
                    defaultValue={defaultValue}
                    onChange={(e)=>{
                        setCurrentValue && setCurrentValue(name, e.currentTarget.value)
                    }}
                    name={name}  id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="published">publicado</option>
                    <option value="unpublished">no publicado</option>
                </select>
            </div>
        )}
    </>
  )
}

import React, { useRef, useEffect } from 'react'
import { MdEdit } from 'react-icons/md'

export const EditableField = (
    //trigger undo is a boolean used as a switch, every time it change, trigger thw useEffect. Parent has be in charge of toggle this value.
    { name, type='text', defaultValue, setCurrentValue, placeholder='', triggerUndo=false } : { name:string, type?:'text'|'textarea', defaultValue:string, setCurrentValue?:(label:string, value:string)=>void, placeholder?:string, triggerUndo?:boolean }
) => {
  
    const inputRef = useRef<HTMLInputElement>(null)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const handleUndo = () => {
        if(inputRef.current && type==='text') inputRef.current.value = defaultValue
        if(textAreaRef.current && type==='textarea') textAreaRef.current.value = defaultValue
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
    </>
  )
}

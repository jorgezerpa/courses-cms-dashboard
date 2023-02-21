import React from 'react'
import { IconType } from 'react-icons'
import { IoHappyOutline, IoSadOutline } from 'react-icons/io5'
import { MdClose } from 'react-icons/md'

export const ErrorActionMessage = (
    { show, toggler, handleClick, title='¡Ups!', text='Hubo un error, Intentálo de nuevo', buttonText='entendido', Icon=IoSadOutline }:{show:boolean,  toggler:()=>void, handleClick:()=>void, title?:string, text?:string, buttonText?:string, Icon?:IconType}
) => {
  return (
    <div className={`${!show && 'hidden'} relative rounded-md shadow-md shadow-gray-700 flex items-center gap-2 px-10 py-5 bg-gradient-to-tr from-orange-700 bg-orange-400`}>
    <div className='absolute top-2 right-2'>
        <MdClose color='white' size={30} onClick={toggler} />
    </div>
    <div>
        <Icon size={100} color='white' />
    </div>
    <div>
        <h3 className='font-bold text-white text-2xl'>{title}</h3>
        <p className='mt-2 font-bold text-white text-sm'>{text}</p>
        <div>
            <button onClick={handleClick} className='mt-2 bg-white text-gray-900 text-xs font-bold py-1 px-2 rounded-md shadow-sm shadow-gray-700 hover:scale-95 transition-all' type='button' >
                {buttonText}
            </button>
        </div>
    </div>
</div>
  )
}

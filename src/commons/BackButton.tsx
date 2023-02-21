import React from 'react'
import { useRouter } from 'next/router'
import { MdArrowBack } from 'react-icons/md'
import { IconType } from 'react-icons'

export const BackButton = ({Icon=MdArrowBack, showIcon=true, size=40, color="#888888", label}:{Icon?:IconType, showIcon?:boolean, size?:number, color?:string, label?:string}) => {
    const router = useRouter()

  return (
    <div onClick={()=>router.back()} className='flex gap-1 items-center'>
      { showIcon && <Icon size={size} color={color} /> }
      { label && <p>{label}</p> }
    </div>
  )
}

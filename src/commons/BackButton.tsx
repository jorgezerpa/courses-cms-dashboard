import React from 'react'
import { useRouter } from 'next/router'
import { MdArrowBack } from 'react-icons/md'
import { IconType } from 'react-icons'

export const BackButton = ({Icon=MdArrowBack, size=40, color="#888888"}:{Icon?:IconType, size?:number, color?:string}) => {
    const router = useRouter()

  return (
    <div onClick={()=>router.back()}>
      <Icon size={size} color={color} />
    </div>
  )
}

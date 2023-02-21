import React from 'react'

export const ConfirmDeleteModal = ({toggler, show, elementId}:{ toggler:()=>void, show:boolean, elementId:string|number }) => {
    return (
        <div className={`${!show && 'hidden'} z-50 fixed top-0 left-0 bottom-0 right-0 bg-opacity-60 bg-black flex justify-center items-center`}>
          <div className='w-[200px] h-[200px] bg-white'>
              <div onClick={toggler}>cerrar</div>
              <div>{ elementId }</div>
          </div>
        </div>
      )
}

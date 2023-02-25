import React from 'react'

{/* IMPORTANT -> VIDEO TAG IS NOT UPDATED IN FUNCTION OF STATE */}
{/* TO TELL REAcT TO UPDATE THE ENTIRE COMPONENT, PROVIDE A KEY PROP THAT CHANGE EVERY TIME VIDEOSRC CHANGE */} 
export const VideoPlayer = ({ videoSrc }:{ videoSrc:string }) => {
  return (
  <video key={videoSrc} controls>
        <source type='video/mp4' src={videoSrc} />
    </video>
  )
}

import React, { useState, useEffect, useRef } from 'react'
import { BackButton } from '@/commons/BackButton'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { EditLessonForm } from '@/components/lessons/EditLessonForm';
import { MdImage, MdVideocam } from 'react-icons/md'
import { useFetchDataOnTrigger } from '@/hooks/useFetchDataOnTrigger';
import { VideoPlayer } from '@/components/videoPlayer/VideoPlayer';
import { routes } from '@/utils/mainApiRoutes';

const SectionDetail = () => {
    const router = useRouter()
    const [videoSrc, setVideoSrc] = useState<string>('')
    const { isError, isLoading, isSuccess, fireUp, result } = useFetchDataOnTrigger('POST', routes.addVideoToLesson(router.query.lessonId as string))
    const inputVideoRef = useRef<HTMLInputElement>(null)
    
    useEffect(()=>{
      if(isSuccess){
        // console.log(result)
      }
    }, [isSuccess])


    const handleVideoUpload = () => {
      if(inputVideoRef.current && inputVideoRef.current.files){
        let file = inputVideoRef.current.files[0]
        let url = URL.createObjectURL(file);console.log(url)
        setVideoSrc(url);
      }
    }

  return (
    <div className='p-5'>
        <BackButton />
        <EditLessonForm />
        <div className='min-h-[300px]'>
          <h2 className='flex'><span><MdVideocam size={30} /></span> Video</h2>
          <input ref={inputVideoRef} onChange={handleVideoUpload} type="file" accept='mp4' multiple={false} />
          { videoSrc!=='' && (
              <VideoPlayer videoSrc={videoSrc} />
          )}
        </div>
        <div className='min-h-[300px]'>
          <h2 className='flex'><span><MdImage size={30} /></span> Recursos</h2>
        </div>
    </div>
  )
}

export default withPageAuthRequired(SectionDetail)
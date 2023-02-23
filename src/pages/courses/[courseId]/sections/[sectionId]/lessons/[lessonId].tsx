import React, { SyntheticEvent, useState, useEffect } from 'react'
import { BackButton } from '@/commons/BackButton'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { Lessons } from '@/components/lessons/lessons';
import { EditLessonForm } from '@/components/lessons/EditLessonForm';
import { EditSectionForm } from '@/components/sections/EditSectionForm';

const SectionDetail = () => {
    const router = useRouter()

  return (
    <div className='p-5'>
        <BackButton />
        <EditLessonForm />
        <Lessons sectionId={router.query.sectionId as string} />
    </div>
  )
}

export default withPageAuthRequired(SectionDetail)
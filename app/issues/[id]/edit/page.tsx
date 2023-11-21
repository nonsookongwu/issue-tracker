import React from 'react'
import prisma from '@/prisma/client';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props{
    params: { id: string };
}

const EditIssuePage = async ({ params: { id } }: Props) => {
    
    const issue = await prisma.issue.findUnique({
        where:{id: +id}
    })

  return (
      <IssueForm issue={issue}/>
  )
}

export default EditIssuePage
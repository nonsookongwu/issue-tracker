import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
import delay from 'delay'

interface Props{
    params: {id:string}
}

const IssuesDetailPage = async ({ params: { id } }: Props) => {
    
   const newIssue = await prisma.issue.findUnique({
        where:{id: +id}
   })
    delay(2000)

    if (!newIssue)
        notFound()

  return (
      <div>IssuesDetailPage { newIssue?.status}</div>
  )
}

export default IssuesDetailPage
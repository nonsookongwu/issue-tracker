import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
import delay from 'delay'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import IssueBadge from '@/app/components/Badge'

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
      <div>
          <Heading>{newIssue.title}</Heading>
          <Flex gap={'5'} my={'4'}>
              <IssueBadge status={newIssue.status} />
              <Text>{ newIssue.createdAt.toDateString()}</Text>
          </Flex>
          <Card>
              <p>{newIssue.description}</p>
          </Card>
    </div>
  )
}

export default IssuesDetailPage
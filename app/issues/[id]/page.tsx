import IssueBadge from '@/app/components/Badge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

interface Props{
    params: {id:string}
}

const IssuesDetailPage = async ({ params: { id } }: Props) => {
    
   const newIssue = await prisma.issue.findUnique({
        where:{id: +id}
   })
    

    if (!newIssue)
        notFound()

  return (
      <div>
          <Heading>{newIssue.title}</Heading>
          <Flex gap={'5'} my={'4'}>
              <IssueBadge status={newIssue.status} />
              <Text>{ newIssue.createdAt.toDateString()}</Text>
          </Flex>
          <Card className='prose' mt={'4'}>
              <ReactMarkdown>{newIssue.description}</ReactMarkdown>
          </Card>
    </div>
  )
}

export default IssuesDetailPage
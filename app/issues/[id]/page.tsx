import IssueBadge from '@/app/components/Badge'
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'

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
      <Grid columns={{ initial: '1', sm: '2' }} gap={'4'}>
          <Box>
          <Heading>{newIssue.title}</Heading>
          <Flex gap={'5'} my={'4'}>
              <IssueBadge status={newIssue.status} />
              <Text>{ newIssue.createdAt.toDateString()}</Text>
          </Flex>
          <Card className='prose' mt={'4'}>
              <ReactMarkdown>{newIssue.description}</ReactMarkdown>
              </Card>
        </Box>
          <Box>
              <Button><Pencil2Icon/> <Link href={`/issues/${newIssue.id}/edit`}>Edit Issues</Link></Button>
        </Box>
    </Grid>
  )
}

export default IssuesDetailPage
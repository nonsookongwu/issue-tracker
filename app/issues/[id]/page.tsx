import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './issueDetails'
import DeleteIssueButton from './DeleteIssueButton'

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
      <Grid columns={{ initial: '1', sm: '5' }} gap={'4'}>
          <Box className='md:col-span-4'>
          <IssueDetails issue={newIssue}/>
        </Box>
          <Box>
              <Flex direction={'column'} gap={'4'}>
              <EditIssueButton issueId={newIssue.id} />
              <DeleteIssueButton issueId={newIssue.id}/>
              </Flex>
        </Box>
    </Grid>
  )
}

export default IssuesDetailPage
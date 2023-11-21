import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './issueDetails'

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
          <IssueDetails issue={newIssue}/>
        </Box>
          <Box>
              <EditIssueButton issueId={newIssue.id}/>
        </Box>
    </Grid>
  )
}

export default IssuesDetailPage
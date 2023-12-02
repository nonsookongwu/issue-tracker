import prisma from '@/prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import IssueChart from './IssueChart';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import { Metadata } from 'next';


export default async function Home() {

 const openIssues = await prisma.issue.count({where:{status:'OPEN'}})
 const inProgressIssues = await prisma.issue.count({where:{status:'IN_PROGRESS'}})
 const closedIssues = await prisma.issue.count({where:{status:'CLOSED'}})

  return (
    <Grid columns={{initial: '1', md: '2'}} gap={'3'}>
      <Flex direction={'column'} gap={'3'}>
        <IssueSummary
          closed={closedIssues}
          inProgress={inProgressIssues}
          open={openIssues}
          />
        <IssueChart
          closed={closedIssues}
          inProgress={inProgressIssues}
          open={openIssues}
        />
      </Flex>
          <LatestIssues/>

    </Grid>
  );
}

export const metadata: Metadata = {
  title: 'Issue Tracker - issue summary',
  description: 'view the summary of project issues'
}

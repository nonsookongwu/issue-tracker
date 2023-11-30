import Image from 'next/image'
import Pagination from './components/Pagination';
import LatestIssues from './LatestIssues';
import IssueSummary from './IssueSummary';
import prisma from '@/prisma/client';
import IssueChart from './IssueChart';


export default async function Home() {

 const openIssues = await prisma.issue.count({where:{status:'OPEN'}})
 const inProgressIssues = await prisma.issue.count({where:{status:'IN_PROGRESS'}})
 const closedIssues = await prisma.issue.count({where:{status:'CLOSED'}})

  return (
    <div>
      {/* <LatestIssues/> */}
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
    </div>
  );
}

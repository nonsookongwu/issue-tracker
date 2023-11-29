
import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueStatusFilter from "./IssueStatusFilter";
import IssuesActions from "./IssuesActions";
import IssuesTable, { SearchParams, columnValues } from "./issuesTable";



interface Props {
  searchParams: SearchParams
}

export interface Columns {
  label: string;
  value: keyof Issue;
  className?: string;
}

const IssuesPage = async ({ searchParams }: Props) => {
 
  

  //validating status
  const statusArray = Object.values(Status);
  const validStatus = statusArray.includes(searchParams.status) ? searchParams.status : undefined;

  //validating order
  const sortArray = columnValues;
  const validSort = sortArray.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  
  //implementating pagination
  const page = parseInt(searchParams.page) || 1
  const pageSize = 10;
  const validPage = page > pageSize ? 1 : page


  const issues = await prisma.issue.findMany({
    where: { status: validStatus },
    orderBy: validSort,
    skip: (validPage - 1) * pageSize,
    take: pageSize
  });

  const issuesCount = await prisma.issue.count({where: {status:validStatus}})

  

  return (
    <Flex direction={'column'} gap={'4'}>
      <Flex justify={"between"} >
        <IssueStatusFilter />
        <IssuesActions />
      </Flex>

      <IssuesTable issues={issues} searchParams={searchParams}/>
      <Pagination currentPage={validPage} itemCount={issuesCount} pageSize={pageSize}/>
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;

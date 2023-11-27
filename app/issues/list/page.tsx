import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import IssueBadge from "../../components/Badge";
import CustomLink from "../../components/Link";
import IssuesActions from "./IssuesActions";
import IssueStatusFilter from "./IssueStatusFilter";
import { Status } from "@prisma/client";

interface Props{
  searchParams: {status:Status}
}

const IssuesPage = async ({ searchParams: { status } }: Props) => {
  
  const statusArray = Object.values(Status)

  const validStatus = statusArray.includes(status) ? status : undefined
  
  const issues = await prisma.issue.findMany({
    where:{status:validStatus}
  });

  return (
    <>
      <Flex justify={"between"} className="max-w-xl">
        <IssueStatusFilter />
        <IssuesActions />
      </Flex>

      <Table.Root variant="surface" className="max-w-xl">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Date created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <CustomLink href={`/issues/${issue.id}`}>
                  {issue.title}{" "}
                </CustomLink>
                <div className="block md:hidden">
                  <IssueBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.RowHeaderCell className="hidden md:table-cell">
                <IssueBadge status={issue.status} />
              </Table.RowHeaderCell>
              <Table.RowHeaderCell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.RowHeaderCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;

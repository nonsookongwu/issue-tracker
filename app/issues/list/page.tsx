import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import IssueBadge from "../../components/Badge";
import CustomLink from "../../components/Link";
import IssuesActions from "./IssuesActions";
import IssueStatusFilter from "./IssueStatusFilter";
import { Issue, Status } from "@prisma/client";
import Link from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: { status: Status, orderBy: keyof Issue };
}

interface Columns {
  label: string;
  value: keyof Issue;
  className?: string;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: Columns[] = [
    { label: "Title", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Date Created",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  const statusArray = Object.values(Status);

  const validStatus = statusArray.includes(searchParams.status) ? searchParams.status : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: validStatus },
  });

  console.log(searchParams)
  

  return (
    <>
      <Flex justify={"between"} className="max-w-xl">
        <IssueStatusFilter />
        <IssuesActions />
      </Flex>

      <Table.Root variant="surface" className="max-w-xl">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                {" "}
                <Link
                  href={
                    // validStatus
                    //   ? `/issues/list/?status=${validStatus}?orderBy${column.value}`
                    //   : `/issues/list/?orderBy${column.value}`
                     {query: {...searchParams, orderBy:column.value}}
                  }
                >
                  {column.label}
                </Link>{" "}
                {column.value === searchParams.orderBy && <ArrowUpIcon className="inline" />}
                
              </Table.ColumnHeaderCell>
            ))}
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

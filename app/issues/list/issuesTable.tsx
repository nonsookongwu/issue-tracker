import IssueBadge from '@/app/components/Badge';
import CustomLink from '@/app/components/Link';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import { Columns } from './page';

export interface SearchParams {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props{
    issues: Issue[];
    searchParams: SearchParams
}

const IssuesTable = ({ issues, searchParams}:Props) => {
  return (
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
                href={{ query: { ...searchParams, orderBy: column.value } }}
              >
                {column.label}
              </Link>{" "}
              {column.value === searchParams.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
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
  );
}

const columns: Columns[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  {
    label: "Date Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnValues = columns.map( column => column.value)

export default IssuesTable
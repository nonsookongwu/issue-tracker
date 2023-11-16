import prisma from '@/prisma/client';
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssuesPage = async () => {

  const issues = await prisma.issue.findMany();


  return (
    <>
      <div className="mb-5">
        <Button>
          <Link href={"/issues/new"}>New Issue</Link>
        </Button>
      </div>

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
              <Table.RowHeaderCell>{issue.title} <div className='block md:hidden'>{ issue.status}</div></Table.RowHeaderCell>
              <Table.RowHeaderCell className="hidden md:table-cell">
                {issue.status}
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
}

export default IssuesPage
import { Table } from '@radix-ui/themes';
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import IssuesActions from './IssuesActions';

const LoadingIssuePage = () => {
    const issues = [1,2,3,4,5,6]
    return (
        <div>
            <IssuesActions/>
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
              <Table.Row key={issue}>
                <Table.RowHeaderCell>
                  <Skeleton />{" "}
                  <div className="block md:hidden">
                    <Skeleton />
                  </div>
                </Table.RowHeaderCell>
                <Table.RowHeaderCell className="hidden md:table-cell">
                  <Skeleton />
                </Table.RowHeaderCell>
                <Table.RowHeaderCell className="hidden md:table-cell">
                  <Skeleton />
                </Table.RowHeaderCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    );
}

export default LoadingIssuePage
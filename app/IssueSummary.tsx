import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link';
import React from 'react'

interface Props{
    open: number;
    inProgress: number;
    closed: number;
}

interface Containers {
    label: string;
    value: number;
    status: Status;
}

const IssueSummary = ({ closed, inProgress, open }: Props) => {
    
    const containers: Containers[] = [
        {label: 'Open Issues', value: open, status:'OPEN' },
        {label: 'In-Progress Issues', value: inProgress, status:'IN_PROGRESS' },
        {label: 'Closed Issues', value: closed, status:'CLOSED' }
    ]


  return (
    <Flex gap={'4'} direction={{initial: 'column', sm:'row'}}>
      {containers.map((container) => (
        <Card key={container.value}>
          <Flex direction={{initial:'row', sm:'column'}} justify={{initial:'between', sm:'start'}} gap={'1'} >
            <Link className='text-sm font-medium' href={`/issues/list?status=${container.status}`}>
              {container.label}
            </Link>
            <Text size={'7'} className='font-bold'>{container.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}

export default IssueSummary
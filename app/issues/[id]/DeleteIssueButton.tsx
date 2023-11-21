import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'

interface Props{
    issueId: number;
}

const DeleteIssueButton = ({issueId}:Props) => {
  return (
    <Button color='red'><Link href={`/issues/${issueId}/delete`}></Link> Delete Issue</Button>
  )
}

export default DeleteIssueButton
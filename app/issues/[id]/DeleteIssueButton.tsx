'use client';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'

interface Props{
    issueId: number;
}

const DeleteIssueButton = ({issueId}:Props) => {
    return (
      <AlertDialog.Root>
            <AlertDialog.Trigger>
            <Button color='red'>Delete Issue</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure you want to delete this issue?<br/>
                    This action cannot be undone
                </AlertDialog.Description>
                <Flex mt={'4'} gap={'4'} justify={'end'}>
                    <AlertDialog.Cancel><Button variant='outline' color='gray'>Cancel</Button></AlertDialog.Cancel>
                    <AlertDialog.Action><Button color='red'>Delete Issue</Button></AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
      </AlertDialog.Root>
  )
}

export default DeleteIssueButton
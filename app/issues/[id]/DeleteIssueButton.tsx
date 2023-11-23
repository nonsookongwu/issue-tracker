"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  issueId: number;
}

const DeleteIssueButton = ({ issueId }: Props) => {
    const router = useRouter();
    const [error, setError] = useState(false)

  const handleDeleteissue = async () => {
      try {
          throw new Error
        await axios.delete(`/api/issues/${issueId}`);
        router.push("/issues");
        router.refresh();
          
      } catch (error) {
          setError(true)
    }
  };
  

    return (
      <>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button color="red">Delete Issue</Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
            <AlertDialog.Description>
              Are you sure you want to delete this issue?
              <br />
              This action cannot be undone
            </AlertDialog.Description>
            <Flex mt={"4"} gap={"4"} justify={"end"}>
              <AlertDialog.Cancel>
                <Button variant="outline" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button color="red" onClick={handleDeleteissue}>
                  Delete Issue
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>

        <AlertDialog.Root open={error}>
          <AlertDialog.Content>
            <AlertDialog.Title>Error</AlertDialog.Title>
            <AlertDialog.Description>
              This Issue cannot be deleted
            </AlertDialog.Description>
            <Flex mt='4' justify='end'>
                <AlertDialog.Cancel>
                  <Button variant="outline" color="gray" onClick={()=> setError(false)}>
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </>
    );
};

export default DeleteIssueButton;

'use client';
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/ValidationSchema';
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage';

// interface IssuesForm{
//   title: string;
//   description: string;
// }
type IssuesForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {

  const router = useRouter()

  const { register, control, handleSubmit, formState:{errors} } = useForm<IssuesForm>({
   resolver: zodResolver(createIssueSchema)
  })
  const [error, setError] = useState("")

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root size={"1"} color="red" className="mb-5">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occured");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Create issue" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage
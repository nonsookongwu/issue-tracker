'use client';
import { createIssueSchema } from '@/app/ValidationSchema';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';


type IssuesForm = z.infer<typeof createIssueSchema>

const SimpleMDE = dynamic(
  () => import("react-simplemde-editor"),
{ssr: false}
);

const NewIssuePage = () => {

  const router = useRouter()

  const { register, control, handleSubmit, formState:{errors} } = useForm<IssuesForm>({
   resolver: zodResolver(createIssueSchema)
  })
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitForm = async (data:IssuesForm) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("An unexpected error occured");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl">
      
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(submitForm)}
      >
        <TextField.Root>
          <TextField.Input placeholder="Create issue" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {" "}
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

export default NewIssuePage
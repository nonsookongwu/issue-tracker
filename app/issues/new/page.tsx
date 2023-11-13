'use client';
import { Button, TextArea, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import React from 'react'
import { useRouter } from 'next/navigation';

interface IssuesForm{
  title: string;
  description: string;
}

const NewIssuePage = () => {

  const router = useRouter()

 const {register, control, handleSubmit} = useForm<IssuesForm>()

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit((data) => {
        axios.post('/api/issues', data)
        router.push('/issues')
      })}
    >
      <TextField.Root>
        <TextField.Input placeholder="Create issue" {...register('title')} />
      </TextField.Root>
      <Controller
        name='description'
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
      />
        
        <Button>Submit New Issue</Button>
    </form>
  );
}

export default NewIssuePage
'use client';
import { Button, TextFieldInput } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { createIssueSchema } from '@/app/validation-schema';
import { z } from 'zod';
import ErrorCallout from '@/components/ErrorCallout';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema) });
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);

  const sendData = async (data: IssueForm) => {
    try {
      const res = await fetch('/api/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'aplication/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to submit data');
      }

      return router.push('/issues');
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  return (
    <form
      className='max-w-xl space-y-4'
      onSubmit={handleSubmit((data) => sendData(data))}
    >
      {error && <ErrorCallout message='An unexpected error occur.' />}
      <ErrorCallout message={errors.title?.message} />
      <TextFieldInput
        placeholder='Title'
        {...register('title')}
      />
      <ErrorCallout message={errors.description?.message} />
      <Controller
        name='description'
        control={control}
        render={({ field }) => (
          <SimpleMDE
            placeholder='Description'
            {...field}
          />
        )}
      />
      <Button>Create Issue</Button>
    </form>
  );
};

export default NewIssuePage;

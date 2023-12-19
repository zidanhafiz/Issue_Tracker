'use client';
import { Button, Flex, TextFieldInput } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { createIssueSchema } from '@/app/validation-schema';
import { z } from 'zod';
import ErrorCallout from '@/components/ErrorCallout';
import Spinner from '@/components/Spinner';
import BackButton from '@/components/BackButton';
import { createIssue } from '@/utils/httpRequest';

export type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema) });
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const sendData = handleSubmit(async (data: IssueForm) => {
    await createIssue({ data, setIsSubmit, setError }, () => {
      router.push('/issues');
    });
  });

  return (
    <>
      <BackButton />
      <form
        className='space-y-4 mt-4'
        onSubmit={sendData}
      >
        {error && <ErrorCallout message='An unexpected error occur.' />}
        <ErrorCallout message={errors.title?.message} />
        <TextFieldInput
          placeholder='Title'
          disabled={isSubmit}
          {...register('title')}
        />
        <ErrorCallout message={errors.description?.message} />
        <Controller
          name='description'
          control={control}
          disabled={isSubmit}
          render={({ field }) => (
            <SimpleMDE
              placeholder='Description'
              {...field}
            />
          )}
        />
        <Flex
          gap='2'
          justify='end'
        >
          <Button
            disabled={isSubmit}
            color='ruby'
          >
            Discard
          </Button>
          <Button disabled={isSubmit}>{isSubmit && <Spinner />}Create Issue</Button>
        </Flex>
      </form>
    </>
  );
};

export default NewIssuePage;

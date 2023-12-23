'use client';
import { Button, Flex, TextFieldInput } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { createIssueSchema } from '@/app/validation-schema';
import { z } from 'zod';
import ErrorCallout from '@/components/ErrorCallout';
import Spinner from '@/components/Spinner';
import BackButton from '@/components/BackButton';
import { createIssue } from '@/utils/httpRequest';
import DiscardButton from '@/components/DiscardButton';
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

export type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({ resolver: zodResolver(createIssueSchema) });
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const mdeOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    };
  }, []);

  const sendData = handleSubmit(async (data: IssueForm) => {
    await createIssue({ data, setIsSubmit }, () => {
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
              options={mdeOptions}
              {...field}
            />
          )}
        />
        <Flex
          gap='2'
          justify='end'
        >
          <DiscardButton isSubmit={isSubmit} />
          <Button
            type='submit'
            disabled={isSubmit}
          >
            {isSubmit && <Spinner />}Create Issue
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default NewIssuePage;

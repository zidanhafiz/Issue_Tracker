'use client';
import { updateIssueSchema } from '@/app/validation-schema';
import Spinner from '@/components/Spinner';
import { getIssueDetail, updateIssue } from '@/utils/httpRequest';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Flex, Text, TextFieldInput } from '@radix-ui/themes';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { z } from 'zod';
import Header from './Header';
import BackButton from '@/components/BackButton';
import StatusSelect from './StatusSelect';
import ErrorCallout from '@/components/ErrorCallout';
import DiscardButton from '@/components/DiscardButton';

const allStatus = [
  {
    name: 'Open',
    value: 'OPEN',
  },
  {
    name: 'In Progress',
    value: 'IN_PROGRESS',
  },
  {
    name: 'Closed',
    value: 'CLOSED',
  },
];

export type IssueFormUpdate = z.infer<typeof updateIssueSchema>;

const EditPage = () => {
  const params = useParams();
  const id = Number(params.id);
  const router = useRouter();
  const [issue, setIssue] = useState({} as Issue);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormUpdate>({
    resolver: zodResolver(updateIssueSchema),
    values: {
      title: issue.title,
      description: issue.description,
      status: issue.status,
    },
  });

  useEffect(() => {
    const getIssue = async () => {
      const res = await getIssueDetail(id, true);
      setIssue(res);
    };
    getIssue();
  }, [id]);

  const updateData = handleSubmit(async (data: IssueFormUpdate) => {
    setIsSubmit(true);
    const newIssue = {
      ...issue,
      title: data.title,
      description: data.description,
      status: data.status,
    };
    await updateIssue(id, newIssue, () => {
      setIsSubmit(false);
      router.push('/issues');
    });
  });

  return (
    <Box>
      <BackButton />
      <Header issue={issue} />
      {issue?.title && (
        <form
          className='mt-8 space-y-4'
          onSubmit={updateData}
        >
          <ErrorCallout message={errors.title?.message} />
          <TextFieldInput
            placeholder='New Title'
            {...register('title')}
          />
          <Flex
            align='center'
            gap='4'
          >
            <Text as='label'>Status</Text>
            <StatusSelect
              status={allStatus}
              defaultValue={issue.status}
              {...register('status')}
            />
          </Flex>
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
          <Flex
            gap='2'
            justify='end'
          >
            <DiscardButton isSubmit={isSubmit} />
            <Button disabled={isSubmit}>{isSubmit && <Spinner />}Update Issue</Button>
          </Flex>
        </form>
      )}
    </Box>
  );
};

export default EditPage;

'use client';
import { updateIssueSchema } from '@/app/validation-schema';
import Spinner from '@/components/Spinner';
import { getIssueDetail } from '@/utils/httpRequest';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Flex, Text, TextFieldInput } from '@radix-ui/themes';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { z } from 'zod';
import Header from './Header';
import BackButton from '@/components/BackButton';
import StatusSelect from './StatusSelect';
import { createStatusObject } from '@/utils/utils';

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

  const { register, control, handleSubmit } = useForm<IssueFormUpdate>({
    resolver: zodResolver(updateIssueSchema),
  });

  const [issue, setIssue] = useState({} as Issue);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [status, setStatus] = useState({} as Status);

  useEffect(() => {
    const getIssue = async () => {
      const res = await getIssueDetail(id, true);
      setIssue(res);
    };
    getIssue();
  }, [id]);

  useEffect(() => {
    const newStat = createStatusObject(issue.status);
    setStatus(newStat);
  }, [issue]);

  return (
    <Box>
      <BackButton />
      <Header issue={issue} />
      {status?.value && (
        <form className='mt-8 space-y-4'>
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
              issueStatus={status.value}
              {...register('status')}
            />
          </Flex>
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
            <Button
              disabled={isSubmit}
              color='ruby'
            >
              Discard
            </Button>
            <Button disabled={isSubmit}>{isSubmit && <Spinner />}Update Issue</Button>
          </Flex>
        </form>
      )}
    </Box>
  );
};

export default EditPage;

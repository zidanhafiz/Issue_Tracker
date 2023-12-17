'use client';
import { Button, Callout, TextFieldInput } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type IssueForm = {
  title: string;
  description: string;
};

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>();
  const router = useRouter();

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
      console.error(error);
    }
  };

  return (
    <form
      className='max-w-xl space-y-4'
      onSubmit={handleSubmit((data) => sendData(data))}
    >
      {errors.title?.type === 'required' && <ErrorCallout message='Title is required!' />}
      <TextFieldInput
        placeholder='Title'
        {...register('title', { required: true })}
        aria-invalid={errors.title ? 'true' : 'false'}
      />
      {errors.description?.type === 'required' && (
        <ErrorCallout message='Description is required!' />
      )}
      <Controller
        name='description'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <SimpleMDE
            placeholder='Description'
            {...field}
            aria-invalid={errors.description ? 'true' : 'false'}
          />
        )}
      />
      <Button>Create Issue</Button>
    </form>
  );
};

const ErrorCallout = ({ message }: { message: string }) => {
  return (
    <Callout.Root
      size='1'
      color='red'
    >
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>
  );
};

export default NewIssuePage;

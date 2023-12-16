'use client';
import { Button, TextArea, TextFieldInput } from '@radix-ui/themes';

const NewIssuePage = () => {
  return (
    <div className='max-w-lg space-y-4'>
      <TextFieldInput placeholder='Title' />
      <TextArea placeholder='Description' />
      <Button>Create Issue</Button>
    </div>
  );
};

export default NewIssuePage;

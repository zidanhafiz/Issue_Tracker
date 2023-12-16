'use client';
import { Button, TextArea, TextFieldInput } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-4'>
      <TextFieldInput placeholder='Title' />
      <SimpleMDE placeholder='Description' />
      <Button>Create Issue</Button>
    </div>
  );
};

export default NewIssuePage;

'use client';
import { Box, Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';

const ButtonGroup = ({ id }: { id: string }) => {
  return (
    <Box className='flex justify-between mt-8'>
      <Flex gap='4'>
        <Link href={`/issues/${id}/edit`}>
          <Button
            size='3'
            variant='outline'
            color='purple'
          >
            Edit
          </Button>
        </Link>
        <Button
          size='3'
          variant='solid'
          color='ruby'
        >
          Delete
        </Button>
      </Flex>
      <Button size='3'>Close Issue</Button>
    </Box>
  );
};

export default ButtonGroup;

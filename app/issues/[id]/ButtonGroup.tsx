'use client';
import ModalButton from '@/components/ModalButton';
import { deleteIssue } from '@/utils/httpRequest';
import { Modal } from '@/utils/utils';
import { Box, Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ButtonGroup = ({ id }: { id: number }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const deleteHandle = async () => {
    setLoading(true);
    await deleteIssue(id);
    setLoading(false);
    router.push('/issues');
  };
  const deleteModal: Modal = new Modal(
    { title: 'Delete Issue', description: 'Are you sure wanna delete this Issue?' },
    deleteHandle
  );

  return (
    <Box className='flex justify-between mt-8'>
      <Flex gap='4'>
        <Link href={`/issues/${id}/edit`}>
          <Button
            size='2'
            variant='outline'
            color='purple'
            radius='full'
            disabled={loading}
          >
            Edit
          </Button>
        </Link>
        <ModalButton
          id={id}
          message={deleteModal.message}
          handle={deleteModal.handle}
        >
          <Button
            size='2'
            variant='solid'
            color='ruby'
            radius='full'
            disabled={loading}
          >
            Delete
          </Button>
        </ModalButton>
      </Flex>
      <Button
        size='2'
        radius='full'
        disabled={loading}
      >
        Close Issue
      </Button>
    </Box>
  );
};

export default ButtonGroup;

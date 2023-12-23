'use client';
import ModalButton from '@/components/ModalButton';
import { deleteIssue, updateIssue } from '@/utils/httpRequest';
import { Modal, createStatus, getNextStatus } from '@/utils/utils';
import { Box, Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ButtonGroup = ({ issue }: { issue: Issue }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const status = issue.status;
  const nextStatus = getNextStatus(status);
  const router = useRouter();
  const id = issue.id;

  const deleteHandle = async () => {
    setLoading(true);
    await deleteIssue(id);
    setLoading(false);
    router.push('/issues');
  };

  const updateStatusHandle = async () => {
    setLoading(true);
    const newStatus = createStatus(status);
    const newIssue = {
      ...issue,
      status: newStatus,
    };
    await updateIssue(id, newIssue, () => {
      setLoading(false);
      router.push('/issues');
    });
  };

  const deleteModal: Modal = new Modal(
    { title: 'Delete Issue', description: 'Are you sure wanna delete this Issue?' },
    deleteHandle
  );

  const updateStatusModal: Modal = new Modal(
    { title: 'Update Status', description: 'Are you sure wanna change this status?' },
    updateStatusHandle
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
      <ModalButton
        id={id}
        message={updateStatusModal.message}
        handle={updateStatusModal.handle}
      >
        <Button
          size='2'
          radius='full'
          disabled={loading}
          color={status === 'CLOSED' ? 'blue' : status === 'OPEN' ? 'purple' : 'teal'}
        >
          {nextStatus}
        </Button>
      </ModalButton>
    </Box>
  );
};

export default ButtonGroup;

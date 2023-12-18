'use client';
import { AlertDialog, Button, Flex, Link } from '@radix-ui/themes';
import { usePathname, useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const onClick = () => {
    router.back();
  };

  if (currentPath !== '/issues/new') {
    return (
      <Link
        onClick={onClick}
        className='flex justify-start w-fit items-center gap-2'
      >
        <FaArrowLeft />
        Back
      </Link>
    );
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Link className='flex justify-start w-fit items-center gap-2'>
          <FaArrowLeft />
          Back
        </Link>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Discard changes</AlertDialog.Title>
        <AlertDialog.Description size='2'>
          Are you sure? This changes will be discard.
        </AlertDialog.Description>
        <Flex
          gap='3'
          mt='4'
          justify='end'
        >
          <AlertDialog.Cancel>
            <Button
              variant='soft'
              color='gray'
            >
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant='solid'
              color='red'
              onClick={onClick}
            >
              Yes
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default BackButton;

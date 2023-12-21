'use client';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { ReactNode } from 'react';

type ModalButton = {
  id?: number;
  children: ReactNode;
  message: Message;
  handle: (id?: number) => Promise<void> | void;
};

const ModalButton = ({ id, children, message, handle }: ModalButton) => {
  const onClick = () => {
    if (id) {
      return handle(id);
    }
    return handle();
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{children}</AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>{message.title}</AlertDialog.Title>
        <AlertDialog.Description size='2'>{message.description}</AlertDialog.Description>
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
              {message.cancel || 'Cancel'}
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant='solid'
              color={message?.yes?.color || 'red'}
              onClick={onClick}
            >
              {message?.yes?.name || 'Yes'}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default ModalButton;

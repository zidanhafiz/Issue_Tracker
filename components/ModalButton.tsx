import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { ReactNode } from 'react';

type ModalButton = {
  id: number;
  children: ReactNode;
  message: Message;
  handle: (id: number) => Promise<void>;
};

const ModalButton = ({ id, children, message, handle }: ModalButton) => {
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
              onClick={() => handle(id)}
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

'use client';
import { Modal } from '@/utils/utils';
import { useRouter } from 'next/navigation';
import ModalButton from './ModalButton';
import { Button } from '@radix-ui/themes';

const DiscardButton = ({ isSubmit }: { isSubmit: boolean }) => {
  const router = useRouter();
  const backHandle = () => {
    router.back();
  };

  const ModalDiscard = new Modal(
    { title: 'Discard Changes', description: 'Are you sure to discard this changes?' },
    backHandle
  );

  return (
    <ModalButton
      message={ModalDiscard.message}
      handle={ModalDiscard.handle}
    >
      <Button
        disabled={isSubmit}
        color='ruby'
      >
        Discard
      </Button>
    </ModalButton>
  );
};

export default DiscardButton;

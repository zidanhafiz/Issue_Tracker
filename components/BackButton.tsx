'use client';
import { Link } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <Link
      onClick={onClick}
      className='flex items-center gap-2'
    >
      <FaArrowLeft />
      Back
    </Link>
  );
};

export default BackButton;

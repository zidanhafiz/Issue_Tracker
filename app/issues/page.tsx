import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const Issues = () => {
  return (
    <div>
      <h1>Issues Page</h1>
      <Link href='issues/new'>
        <Button>Create New Issue</Button>
      </Link>
    </div>
  );
};

export default Issues;

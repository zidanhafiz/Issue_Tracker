import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const Issues = () => {
  return (
    <div>
      <h1>Issues Page</h1>
      <Button>
        <Link href='issues/new'>Create New Issue</Link>
      </Button>
    </div>
  );
};

export default Issues;

import { Button, Flex, Heading } from '@radix-ui/themes';
import Link from 'next/link';
import IssueInputSearch from './IssueInputSearch';

const Issues = () => {
  return (
    <>
      <Flex
        justify='between'
        align='center'
        mb='4'
      >
        <Heading size='4'>All Issues</Heading>
        <Link href='issues/new'>
          <Button>New Issue</Button>
        </Link>
      </Flex>
      <hr />
      <div className='mt-8'>
        <IssueInputSearch />
        <p>Issue</p>
      </div>
    </>
  );
};

export default Issues;

import { Box, Button, Flex, Heading, Separator, Text } from '@radix-ui/themes';
import Link from 'next/link';
import IssueInputSearch from './IssueSearch';
import { baseUrl, getIssues } from '@/utils/httpRequest';
import IssuesContainer from './IssuesContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Issue Tracker | Issues',
  description: 'Check your app issue',
};

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [search, status, sort] = [searchParams.q, searchParams.s, searchParams.b];
  const issues: Issue[] = await getIssues(baseUrl, search, status, sort);

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
      <Separator />
      <Box className='mt-6'>
        <IssueInputSearch />
        <IssuesContainer issues={issues} />
      </Box>
    </>
  );
};

export default IssuesPage;

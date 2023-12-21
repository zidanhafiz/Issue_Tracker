import { Button, Flex, Heading, Separator, Text } from '@radix-ui/themes';
import Link from 'next/link';
import IssueInputSearch from './IssueSearch';
import IssueList from '@/components/IssueList';
import { getIssues } from '@/utils/httpRequest';

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [search, status, sort] = [searchParams.q, searchParams.s, searchParams.b];
  const issues: Issue[] = await getIssues(search, status, sort);

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
      <div className='mt-6'>
        <IssueInputSearch />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>
          {issues.length > 0 ? (
            issues.map((issue) => (
              <IssueList
                key={issue.id}
                issue={issue}
              />
            ))
          ) : (
            <Text
              as='div'
              className='text-center md:col-span-3'
            >
              <em>Issue Not Found!</em>
            </Text>
          )}
        </div>
      </div>
    </>
  );
};

export default IssuesPage;

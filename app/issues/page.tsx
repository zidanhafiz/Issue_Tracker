import { Button, Flex, Heading, Separator } from '@radix-ui/themes';
import Link from 'next/link';
import IssueInputSearch from './IssueSearch';
import IssueList from './IssueList';
import { getIssues } from '@/utils/httpRequest';

const IssuesPage = async () => {
  const issues: Issue[] = await getIssues();

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
          {issues &&
            issues.map((issue) => (
              <IssueList
                key={issue.id}
                issue={issue}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default IssuesPage;

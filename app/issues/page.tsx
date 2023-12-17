import { Button, Flex, Heading, Separator } from '@radix-ui/themes';
import Link from 'next/link';
import IssueInputSearch from './IssueInputSearch';
import IssueList from './IssueList';

const getIssues = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/issues');

    if (!res.ok) {
      throw new Error('Error get data');
    }

    const issues = await res.json();
    return issues;
  } catch (error) {
    console.error(error);
    return null;
  }
};

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
        <div className='max-w-screen-xl mx-auto flex flex-col md:flex-row md:flex-wrap gap-4 mt-6'>
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

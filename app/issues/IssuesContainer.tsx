import IssueList from '@/components/IssueList';
import { Box, Text } from '@radix-ui/themes';

const IssuesContainer = ({ issues }: { issues: Issue[] }) => {
  if (issues.length > 0) {
    return (
      <Box className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>
        {issues.map((issue) => (
          <IssueList
            key={issue.id}
            issue={issue}
          />
        ))}
      </Box>
    );
  }
  return (
    <Box>
      <Text
        as='div'
        className='text-center md:col-span-3'
      >
        <em>Issue Not Found!</em>
      </Text>
    </Box>
  );
};

export default IssuesContainer;

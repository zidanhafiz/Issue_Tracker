import { formatDate, createStatusObject } from '@/utils/utils';
import { Badge, Box, Button, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

const IssueList = ({ issue }: { issue: Issue }) => {
  const openedAt = formatDate(issue.createdAt);
  const status = createStatusObject(issue.status);

  return (
    <Box className='border border-gray-300 py-4 px-4 rounded-lg'>
      <Flex
        gap='4'
        align='center'
        mb='4'
      >
        <Box className='overflow-hidden'>
          <Text
            as='div'
            size='2'
            weight='bold'
            mb='2'
          >
            {issue.title}
          </Text>
          <Text
            as='p'
            size='1'
            weight='regular'
            color='gray'
            className='truncate'
          >
            {issue.description}
          </Text>
        </Box>
      </Flex>
      <Text
        as='p'
        size='1'
        weight='regular'
        color='gray'
        mb='2'
      >
        <em>Opened at: {openedAt}</em>
      </Text>
      <Flex justify='between'>
        <Badge
          color={status.color}
          variant='soft'
          radius='full'
        >
          {status.name}
        </Badge>
        <Link href={`/issues/${issue.id}`}>
          <Button
            size='1'
            variant='outline'
            color='purple'
          >
            Details
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default IssueList;

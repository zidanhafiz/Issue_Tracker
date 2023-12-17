import { Badge, Box, Flex, Heading, Separator, Text } from '@radix-ui/themes';
import ButtonGroup from './ButtonGroup';
import BackButton from '@/components/BackButton';
import { formatDate, getStatusObject } from '@/utils/utils';

const getIssueDetail = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:3000/api/issues/${id}`);

    if (!res.ok) {
      throw new Error('Error get data');
    }

    const issue = await res.json();
    return issue;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const IssueDetails = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);
  const issue: Issue = await getIssueDetail(id);
  const openedAt = formatDate(issue.createdAt);
  const closedAt = formatDate(issue.updatedAt);
  const status = getStatusObject(issue.status);

  return (
    <Box className='max-w-screen-lg mx-auto'>
      <BackButton />
      <Heading
        as='h1'
        size='5'
        mt='6'
      >
        {issue.title}
      </Heading>
      <Flex
        justify='between'
        align='center'
        mb='2'
        mt='4'
      >
        <Text
          as='div'
          size='1'
        >
          ID: {issue.id}
        </Text>
        <Badge
          variant='soft'
          color={status.color}
        >
          {status.name}
        </Badge>
      </Flex>
      <Separator size='4' />
      <Text
        as='p'
        mt='5'
        mb='8'
      >
        {issue.description}
      </Text>
      <Flex
        direction='column'
        align='end'
        gap='2'
        mb='4'
      >
        <Badge
          variant='soft'
          color='blue'
        >
          Opened at: {openedAt}
        </Badge>
        <Badge
          variant='soft'
          color={status.name === 'Open' ? 'orange' : 'green'}
        >
          {status.name === 'Open' ? 'Not Finished' : `Closed at: ${closedAt}`}
        </Badge>
      </Flex>
      <Separator size='4' />
      <ButtonGroup id='3' />
    </Box>
  );
};

export default IssueDetails;

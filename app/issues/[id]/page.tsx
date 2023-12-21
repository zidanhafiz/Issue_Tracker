import { Badge, Box, Flex, Heading, Separator, Text } from '@radix-ui/themes';
import ButtonGroup from './ButtonGroup';
import BackButton from '@/components/BackButton';
import { formatDate, createStatusObject } from '@/utils/utils';
import { baseUrl, getIssueDetail } from '@/utils/httpRequest';
import Markdown from 'react-markdown';
import styles from '@/app/markdown.module.css';

const IssueDetails = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);
  const issue: Issue = await getIssueDetail(baseUrl, id);
  const openedAt = formatDate(issue.createdAt);
  const closedAt = formatDate(issue.updatedAt);
  const status = createStatusObject(issue.status);

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
          color={status?.color}
        >
          {status?.name}
        </Badge>
      </Flex>
      <Separator
        size='4'
        mb='4'
      />
      <Markdown className={styles.markdown}>{issue.description}</Markdown>
      <Flex
        direction='column'
        align='end'
        gap='2'
        mt='6'
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
          color={status?.name === 'Closed' ? 'green' : 'orange'}
        >
          {status?.name === 'Closed' ? `Closed at: ${closedAt}` : 'Not Finished'}
        </Badge>
      </Flex>
      <Separator size='4' />
      <ButtonGroup issue={issue} />
    </Box>
  );
};

export default IssueDetails;

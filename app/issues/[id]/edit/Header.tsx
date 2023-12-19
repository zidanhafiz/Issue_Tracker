import { createStatusObject, formatDate } from '@/utils/utils';
import { Flex, Heading, Text, Separator, Badge } from '@radix-ui/themes';

const Header = ({ issue }: { issue: Issue }) => {
  const status = createStatusObject(issue.status);
  const openedAt = formatDate(issue.createdAt);

  return (
    <>
      <Heading
        as='h1'
        mt='2'
      >
        {issue.title}
      </Heading>
      <Flex
        justify='between'
        mt='4'
        mb='1'
      >
        <Text
          as='p'
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
      <Text
        as='p'
        mb='4'
        size='1'
        color='gray'
      >
        <em>Opened at: {openedAt}</em>
      </Text>
      <Separator size='4' />
    </>
  );
};

export default Header;

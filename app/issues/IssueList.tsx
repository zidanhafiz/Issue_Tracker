import { formatDate, getStatusObject } from '@/utils/utils';
import { Badge, Box, Button, Flex, Text, badgePropDefs } from '@radix-ui/themes';
import React from 'react';

const IssueList = ({ issue }: { issue: Issue }) => {
  const openedAt = formatDate(issue.createdAt);
  const status = getStatusObject(issue.status);

  return (
    <Box className='border border-gray-300 py-4 px-4 rounded-lg w-full max-w-xl'>
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
        <Button
          size='1'
          variant='outline'
          color='purple'
        >
          Details
        </Button>
      </Flex>
    </Box>
  );
};

export default IssueList;

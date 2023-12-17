import { Badge, Box, Button, Flex, Text } from '@radix-ui/themes';
import React from 'react';

const IssueList = ({ issue }: { issue: Issue }) => {
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
        Opened at: {issue.createdAt}
      </Text>
      <Flex justify='between'>
        <Badge
          color='ruby'
          variant='soft'
          radius='full'
        >
          {issue.status}
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

'use client';
import CategorySelect from '@/components/CategorySelect';
import { Box, Flex, Select, Text, TextField } from '@radix-ui/themes';

const categories = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Open',
    value: 'open',
  },
  {
    name: 'In Progress',
    value: 'in-progress',
  },
  {
    name: 'Closed',
    value: 'closed',
  },
];

const IssueInputSearch = () => {
  return (
    <Box className='max-w-screen-xl mx-auto'>
      <Flex
        justify='center'
        width='100%'
        gap='2'
        mb='6'
      >
        <TextField.Input
          placeholder='Search Issue'
          width='100%'
        />
        <CategorySelect categories={categories} />
      </Flex>
      <Text
        as='div'
        className='underline'
        weight='medium'
        size='2'
      >
        Recent
      </Text>
    </Box>
  );
};

export default IssueInputSearch;

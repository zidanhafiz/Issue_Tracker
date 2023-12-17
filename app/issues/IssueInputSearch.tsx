'use client';
import CategorySelect from '@/components/CategorySelect';
import { Flex, Select, TextField } from '@radix-ui/themes';

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
    <Flex
      justify='center'
      width='100%'
      gap='2'
    >
      <TextField.Input
        placeholder='Search Issue'
        width='100%'
      />
      <CategorySelect categories={categories} />
    </Flex>
  );
};

export default IssueInputSearch;

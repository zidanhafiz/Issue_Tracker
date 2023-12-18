'use client';
import CategorySelect from '@/components/CategorySelect';
import { Box, Flex, Select, Text, TextField } from '@radix-ui/themes';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
  const router = useRouter();
  const refreshPage = () => router.refresh();
  const currentPath = usePathname();

  useEffect(() => {
    router.refresh();
  }, [router, currentPath]);

  return (
    <Box className='max-w-screen-xl mx-auto'>
      <Flex
        justify='center'
        width='100%'
        gap='2'
        mb='7'
      >
        <TextField.Input
          placeholder='Search Issue'
          width='100%'
        />
        <CategorySelect categories={categories} />
      </Flex>
      <Flex
        justify='center'
        gap='8'
      >
        <Text
          as='div'
          className='underline hover:no-underline cursor-pointer'
          weight='medium'
          size='2'
        >
          Recent
        </Text>
        <Text
          as='div'
          className='underline hover:no-underline cursor-pointer'
          weight='medium'
          size='2'
          onClick={refreshPage}
        >
          Refresh
        </Text>
      </Flex>
    </Box>
  );
};

export default IssueInputSearch;

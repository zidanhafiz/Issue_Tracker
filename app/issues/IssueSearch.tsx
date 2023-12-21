'use client';
import SortBy from '@/components/SortBy';
import StatusSelect from '@/components/StatusSelect';
import { Box, Flex, IconButton, Text, TextField } from '@radix-ui/themes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const allStatus = [
  {
    name: 'All',
    value: 'ALL',
  },
  {
    name: 'Open',
    value: 'OPEN',
  },
  {
    name: 'In Progress',
    value: 'IN_PROGRESS',
  },
  {
    name: 'Closed',
    value: 'CLOSED',
  },
];

const IssueSearch = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('ALL');
  const [sort, setSort] = useState<string>('asc');
  const refreshPage = () => router.refresh();

  useEffect(() => {
    router.prefetch('/issues')
    router.refresh();
  }, [router, currentPath]);

  useEffect(() => {
    const [q, s] = [searchParams.get('q'), searchParams.get('s')];
    if (q || s) {
      return router.push(`/issues?q=${q}&s=${s}&b=${sort}`);
    }
    return router.push(`/issues?b=${sort}`);
  }, [router, sort, searchParams]);

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    const searchFormat = search.toLowerCase();
    const statusFormat = status.toLowerCase();
    router.push(`/issues?q=${searchFormat}&s=${statusFormat}`);
  };

  return (
    <Box className='max-w-screen-xl mx-auto'>
      <form
        className='flex justify-center w-full gap-4 mb-8'
        onSubmit={submitSearch}
      >
        <StatusSelect
          status={allStatus}
          value={status}
          setStatus={setStatus}
        />
        <TextField.Input
          placeholder='Search Issue'
          width='100%'
          color='iris'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton
          radius='full'
          color='iris'
          type='submit'
        >
          <FaSearch />
        </IconButton>
      </form>
      <Flex
        justify='center'
        align='center'
        gap='8'
      >
        <SortBy
          value={sort}
          setSort={setSort}
        />
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

export default IssueSearch;

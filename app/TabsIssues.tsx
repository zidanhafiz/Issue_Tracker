'use client';
import IssueList from '@/components/IssueList';
import { getIssues } from '@/utils/httpRequest';
import { Box, Tabs } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

const allStatus = [
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

const TabsIssues = () => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <Tabs.Root
      defaultValue='OPEN'
      className='w-full'
    >
      <Tabs.List>
        {allStatus.map((status) => (
          <Tabs.Trigger
            key={status.name}
            value={status.value}
          >
            {status.name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Box
        px='2'
        pt='3'
        pb='2'
      >
        {allStatus.map((status, i) => (
          <Tabs.Content
            key={status.name}
            value={status.value}
            className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-4 mt-4'
          >
            <IssuesTabContent status={status.value} />
          </Tabs.Content>
        ))}
      </Box>
    </Tabs.Root>
  );
};

const IssuesTabContent = ({ status }: { status: string }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchIssues = async () => {
      const newIssues = await getIssues(null, undefined, status, 'desc');
      setIssues(newIssues);
      setLoading(false);
    };
    fetchIssues();
  }, [status]);

  if (loading) {
    return (
      <>
        <Skeleton height='120px' />
        <Skeleton height='120px' />
        <Skeleton height='120px' />
        <Skeleton height='120px' />
        <Skeleton height='120px' />
        <Skeleton height='120px' />
      </>
    );
  }

  return (
    <>
      {issues.map((issue) => (
        <IssueList
          key={issue.id}
          issue={issue}
        />
      ))}
    </>
  );
};

export default TabsIssues;

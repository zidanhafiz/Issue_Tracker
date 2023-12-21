import { Box, Heading, Separator } from '@radix-ui/themes';
import TabsIssues from './TabsIssues';
import CardStatus from './CardStatus';
import { getTotalIssues } from '@/utils/httpRequest';

export default async function Home() {
  const totalIssues: TotalIssues[] = await getTotalIssues();

  return (
    <Box>
      <Heading
        as='h1'
        mb='4'
      >
        Dashboard
      </Heading>
      <Separator size='4' />
      <Box className='flex flex-col w-full justify-stretch gap-8 mt-12'>
        <Box className='grid grid-cols-2 md:grid-cols-4 gap-4 w-full content-start'>
          {totalIssues.length > 0 &&
            totalIssues.map((issue, i) => (
              <CardStatus
                key={i}
                index={i}
                name={issue.name}
                total={issue.total}
              />
            ))}
        </Box>
        <TabsIssues />
      </Box>
    </Box>
  );
}

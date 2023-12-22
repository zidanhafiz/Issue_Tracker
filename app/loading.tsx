import { Box, Separator } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';

export default function Loading() {
  return (
    <Box>
      <Skeleton height='40px' />
      <Separator
        size='4'
        mt='4'
      />
      <Box className='flex flex-col w-full justify-stretch gap-8 mt-12'>
        <Box className='grid grid-cols-2 md:grid-cols-4 gap-4 w-full content-start'>
          <Skeleton height='90px' />
          <Skeleton height='90px' />
          <Skeleton height='90px' />
          <Skeleton height='90px' />
        </Box>
        <Skeleton height='30px' />
        <Box className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          <Skeleton height='120px' />
          <Skeleton height='120px' />
          <Skeleton height='120px' />
          <Skeleton height='120px' />
          <Skeleton height='120px' />
          <Skeleton height='120px' />
        </Box>
      </Box>
    </Box>
  );
}

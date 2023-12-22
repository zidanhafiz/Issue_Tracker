import { Box, Flex, Separator } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';

export default function Loading() {
  return (
    <>
      <Flex
        justify='between'
        align='center'
        mb='4'
      >
        <Skeleton
          height='40px'
          width='150px'
          containerClassName='flex-1'
        />
        <Skeleton
          height='40px'
          width='100px'
          containerClassName='flex-2'
        />
      </Flex>
      <hr />
      <Separator />
      <Box className='mt-6 flex justify-center'>
        <Skeleton
          height='30px'
          width='300px'
          containerClassName='flex-2'
        />
      </Box>
      <Box className='mt-6 flex justify-center'>
        <Skeleton
          height='20px'
          width='200px'
          containerClassName='flex-2'
        />
      </Box>
      <Box className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Skeleton height='120px' />
        <Skeleton height='120px' />
        <Skeleton height='120px' />
        <Skeleton height='120px' />
        <Skeleton height='120px' />
        <Skeleton height='120px' />
        <Skeleton height='120px' />
        <Skeleton height='120px' />
        <Skeleton height='120px' />
      </Box>
    </>
  );
}

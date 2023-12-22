import { Box, Flex, Separator } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';

export default function Loading() {
  return (
    <Box>
      <Skeleton
        width='100px'
        height='30px'
        className='mb-4'
      />
      <Skeleton height='40px' />
      <Skeleton
        height='400px'
        className='my-4'
      />
      <Separator size='4' />
      <Flex
        justify='end'
        my='4'
      >
        <Skeleton
          width='100px'
          height='40px'
        />
        <Skeleton
          width='100px'
          height='40px'
        />
      </Flex>
    </Box>
  );
}

import { Box, Flex, Separator } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';

export default function Loading() {
  return (
    <Box className='max-w-screen-lg mx-auto'>
      <Skeleton
        width='100px'
        height='30px'
      />
      <Skeleton
        width='250px'
        height='40px'
        className='mt-4'
      />
      <Flex
        justify='between'
        my='4'
      >
        <Skeleton
          width='80px'
          height='20px'
        />
        <Skeleton
          width='80px'
          height='20px'
        />
      </Flex>
      <Separator size='4' />
      <Skeleton
        height='400px'
        className='my-4'
      />
      <Separator size='4' />
      <Flex
        justify='between'
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

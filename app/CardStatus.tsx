import { Box, Text } from '@radix-ui/themes';
import { BsBugFill } from 'react-icons/bs';
import { FaBookOpen } from 'react-icons/fa6';
import { TbProgress } from 'react-icons/tb';
import { TiTick } from 'react-icons/ti';

const icons = [
  <BsBugFill key='1' />,
  <FaBookOpen key='2' />,
  <TbProgress key='3' />,
  <TiTick key='4' />,
];

const CardStatus = ({
  total,
  name,
  index,
}: {
  total: number;
  name: string;
  index: number;
}) => {
  return (
    <Box className='flex items-center justify-start gap-5 py-4 px-4 md:px-6 border bg-teal-500 text-white rounded-xl'>
      <Text className='text-lg md:text-2xl'>{icons[index]}</Text>
      <Box>
        <Text
          as='p'
          weight='bold'
          className='text-xl md:text-2xl'
        >
          {total}
        </Text>
        <Text
          as='p'
          className='text-xs md:text-base'
        >
          {name}
        </Text>
      </Box>
    </Box>
  );
};

export default CardStatus;

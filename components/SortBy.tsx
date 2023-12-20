import { Select } from '@radix-ui/themes';
import { Dispatch, SetStateAction } from 'react';

type Sort = {
  name: string;
  value: string;
};

type SortByProps = {
  value: string;
  setSort: Dispatch<SetStateAction<string>>;
};

const sortList: Sort[] = [
  {
    name: 'Newest',
    value: 'desc',
  },
  {
    name: 'Oldest',
    value: 'asc',
  },
];

const SortBy = ({ value, setSort }: SortByProps) => {
  return (
    <Select.Root
      value={value}
      onValueChange={(e) => setSort(e)}
    >
      <Select.Trigger
        radius='full'
        color='tomato'
        variant='soft'
      />
      <Select.Content
        position='popper'
        color='gold'
      >
        <Select.Group>
          {sortList.map((s) => (
            <Select.Item
              key={s.name}
              value={s.value}
            >
              {s.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default SortBy;

import { Select } from '@radix-ui/themes';
import { Dispatch, SetStateAction } from 'react';

type Status = {
  name: string;
  value: string;
};

type StatusSelectProps = {
  status: Status[];
  value: string;
  setStatus: Dispatch<SetStateAction<string>>;
};

const StatusSelect = ({ status, value, setStatus }: StatusSelectProps) => {
  return (
    <Select.Root
      value={value}
      onValueChange={(e) => setStatus(e)}
    >
      <Select.Trigger />
      <Select.Content
        position='popper'
        color='iris'
      >
        <Select.Group>
          {status.map((s) => (
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

export default StatusSelect;

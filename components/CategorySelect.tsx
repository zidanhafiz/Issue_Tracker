import { Select } from '@radix-ui/themes';

type Status = {
  name: string;
  value: string;
};

const StatusSelect = ({ status }: { status: Status[] }) => {
  return (
    <Select.Root defaultValue={status[0].value}>
      <Select.Trigger />
      <Select.Content position='popper'>
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

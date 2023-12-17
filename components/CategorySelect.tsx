import { Select } from '@radix-ui/themes';

type Categories = {
  name: string;
  value: string;
};

const CategorySelect = ({ categories }: { categories: Categories[] }) => {
  return (
    <Select.Root defaultValue={categories[0].value}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          {categories.map((c) => (
            <Select.Item
              key={c.name}
              value={c.value}
            >
              {c.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default CategorySelect;

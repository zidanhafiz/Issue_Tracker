'use client';
import { Select } from '@radix-ui/themes';
import { UseFormRegister } from 'react-hook-form';
import React from 'react';
import { IssueFormUpdate } from './page';

type Status = {
  name: string;
  value: string;
};

const StatusSelect = React.forwardRef<
  HTMLSelectElement,
  { issueStatus: string; status: Status[] } & ReturnType<UseFormRegister<IssueFormUpdate>>
>(({ onChange, onBlur, issueStatus, status }, ref) => (
  <>
    <Select.Root
      defaultValue={issueStatus}
      {...onChange}
      {...onBlur}
      {...ref}
    >
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
  </>
));

StatusSelect.displayName = 'StatusSelect';

export default StatusSelect;

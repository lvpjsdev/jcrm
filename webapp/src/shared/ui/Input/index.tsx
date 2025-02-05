import { Input as MantineInput } from '@mantine/core';
import type { FC, ChangeEvent } from 'react';

type InputProps = {
  label: string;
  name: string;
  type: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<unknown>) => void;
  value?: string | number;
  error?: string;
};

export const Input: FC<InputProps> = ({
  label,
  name,
  type,
  onChange,
  value,
  disabled = false,
  error = '',
}) => (
  <MantineInput.Wrapper label={label} error={error}>
    <MantineInput
      id={name}
      name={name}
      type={type}
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
  </MantineInput.Wrapper>
);

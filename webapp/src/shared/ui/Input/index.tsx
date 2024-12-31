import type { FC, ChangeEvent } from 'react';

type InputProps = {
  label: string;
  name: string;
  type: string;
  onChange: (e: ChangeEvent<unknown>) => void;
  value: string | number | Date;
};

export const Input: FC<InputProps> = ({ label, name, type, onChange, value }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <br />
    <input id={name} name={name} type={type} onChange={onChange} value={value} />
  </div>
);

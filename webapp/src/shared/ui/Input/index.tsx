import type { FC, ChangeEvent } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

type InputProps = {
  label: string;
  name: string;
  type: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<unknown>) => void;
  value: string | number;
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
  <div className={styles.container}>
    <label htmlFor={name} className={styles.label}>
      {label}
    </label>
    <input
      className={cn(styles.input, { error: !!error })}
      id={name}
      name={name}
      type={type}
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
    <div className={styles.infoText}>{error}</div>
  </div>
);

import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styles from './styles.module.scss';

type ButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = ({ children, ...rest }) => (
    <button {...rest} className={styles.button}>
      {children}
    </button>
  );

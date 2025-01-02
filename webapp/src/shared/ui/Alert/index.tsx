import { GenericCheckRounded } from '@heathmont/moon-icons-tw';
import { NotificationsError } from '@heathmont/moon-icons-tw';
import { ControlsCloseSmall } from '@heathmont/moon-icons-tw';
import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const icons = {
  ok: <GenericCheckRounded color="roshi" />,
  error: <NotificationsError color="chichi" />,
};

export type StyleType = keyof typeof icons;

interface AlertProps {
  type: StyleType;
  title?: string;
  message?: string;
  onClose?: () => void;
}

export const Alert: FC<AlertProps> = ({ type, title = '', message = '', onClose }) => {
  const icon = icons[type];
  const isMultiline = !!title;
  const titleStyleClass = isMultiline ? styles.title : styles.text;

  return (
    <section className={cn(styles.alertContainer, styles[type])}>
      <div className={styles.content}>
        <div className={styles.icon}>{icon}</div>
        <span className={titleStyleClass}>{title || message}</span>
        {isMultiline && <span className={styles.text}>{message}</span>}
      </div>
      <ControlsCloseSmall className={styles.close} onClick={onClose} />
    </section>
  );
};

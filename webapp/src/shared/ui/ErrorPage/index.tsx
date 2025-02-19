import type { FC } from 'react';

type Props = {
  title?: string;
  description?: string;
};

export const ErrorPageComponent: FC<Props> = ({ title, description }) => (
  <div>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
);

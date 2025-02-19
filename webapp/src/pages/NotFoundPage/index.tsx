import type { FC } from 'react';
import { ErrorPageComponent } from '../../shared/ui/ErrorPage';

type Props = {
  title?: string;
  description?: string;
};

export const NotFoundPage: FC<Props> = ({
  title = '404 - Page Not Found',
  description = 'Page not found',
}) => <ErrorPageComponent title={title} description={description} />;

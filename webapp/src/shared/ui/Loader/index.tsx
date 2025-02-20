import { Center, Loader as MantineLoader } from '@mantine/core';
import type { FC } from 'react';

type Props = {
  type?: 'page' | 'section';
};

export const Loader: FC<Props> = ({ type = 'page' }) => {
  if (type === 'page') {
    return (
      <Center h="full">
        <MantineLoader size="xl" />
      </Center>
    );
  }

  return <MantineLoader type="dots" />;
};

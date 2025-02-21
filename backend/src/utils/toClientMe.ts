import type { User } from '@prisma/client';

export const toClientMe = (me: User | null) =>
  me && {
    id: me.id,
    telegram: me.telegram,
    permissions: me.permissions,
  };

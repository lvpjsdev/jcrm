import type { User, UserPermission } from '@prisma/client';

type MbUser = Pick<User, 'permissions' | 'id'> | null;

const hasPermission = (user: MbUser, permission: UserPermission) =>
  user?.permissions.includes(permission) || user?.permissions.includes('ALL') || false;

export const canBlockUser = (user: MbUser) => hasPermission(user, 'BLOCK_USERS');

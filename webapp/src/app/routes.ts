/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
const getRouteParams = <T extends Record<string, boolean>>(object: T) =>
  Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<
    keyof T,
    string
  >;

export const viewUsersRouteParams = getRouteParams({ userId: true });
export const viewKeysRouteParams = getRouteParams({ keyId: true });

export type ViewUsersRouteParams = typeof viewUsersRouteParams;
export type ViewKeysRouteParams = typeof viewKeysRouteParams;

export const getViewAllUsersRoute = () => '/';
export const getViewUserRoute = ({ userId }: ViewUsersRouteParams) => `/users/${userId}`;
export const getViewAddUserRoute = () => `/users/new`;
export const getViewUpdateUserRoute = ({ userId }: ViewUsersRouteParams) =>
  `/users/${userId}/edit`;
export const getViewKeysListRoute = () => `/keys`;
export const getViewKeyRoute = ({ keyId }: ViewKeysRouteParams) => `/keys/${keyId}`;
export const getViewAddKeyRoute = () => `/keys/new`;
export const getViewUpdateKeyRoute = ({ keyId }: ViewKeysRouteParams) =>
  `/keys/${keyId}/edit`;
export const getViewSignUpRoute = () => `/sign-up`;
export const getViewSignInRoute = () => `/sign-in`;
export const getViewSignOutRoute = () => `/sign-out`;

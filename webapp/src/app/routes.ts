/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
const getRouteParams = <T extends Record<string, boolean>>(object: T) =>
  Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<
    keyof T,
    string
  >;

export const viewUsersRouteParams = getRouteParams({ userId: true });
console.log('viewUsersRouteParams', viewUsersRouteParams);

export type ViewUsersRouteParams = typeof viewUsersRouteParams;

export const getViewAllUsersRoute = () => '/';
export const getViewUserRoute = ({ userId }: ViewUsersRouteParams) => `/users/${userId}`;
export const getViewAddUserRoute = () => `/users/new`;
export const getViewSignUpRoute = () => `/sign-up`;
export const getViewSignInRoute = () => `/sign-in`;

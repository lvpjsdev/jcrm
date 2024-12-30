const getRouteParams = <T extends Record<string, boolean>>(object: T) =>
  Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>;

export const viewUsersRouteParams = getRouteParams({ userId: true });
console.log('viewUsersRouteParams', viewUsersRouteParams);

export type ViewUsersRouteParams = typeof viewUsersRouteParams;

export const getViewAllUsersRoute = () => '/';
export const getViewUserRoute = ({ userId }: ViewUsersRouteParams) => {
  return `/users/${userId}`;
};

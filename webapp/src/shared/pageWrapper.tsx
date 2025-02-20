/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable complexity */
import type {
  UseTRPCQueryResult,
  UseTRPCQuerySuccessResult,
} from '@trpc/react-query/shared';
import { type FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { type AppContext, useAppContext } from '../app/ctx';
import { getViewSignInRoute } from '../app/routes';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ErrorPageComponent } from './ui/ErrorPage';

class CheckAccessError extends Error {}
class CheckExistsError extends Error {}
class GetAuthorizedMeError extends Error {}

const checkExistsFn = <T,>(value: T, message?: string): NonNullable<T> => {
  if (!value) {
    throw new CheckExistsError(message);
  }

  return value;
};

const checkAccessFn = (value: unknown, message?: string): void => {
  if (!value) {
    throw new CheckAccessError(message);
  }
};

type Props = Record<string, any>;
type QueryResult = UseTRPCQueryResult<any, any>;
type QuerySuccessResult<TQueryResult extends QueryResult> = UseTRPCQuerySuccessResult<
  NonNullable<TQueryResult['data']>,
  null
>;
type HelperProps<TQueryResult extends QueryResult | undefined> = {
  ctx: AppContext;
  queryResult: TQueryResult extends QueryResult
    ? QuerySuccessResult<TQueryResult>
    : undefined;
};
type SetPropsProps<TQueryResult extends QueryResult | undefined> =
  HelperProps<TQueryResult> & {
    checkExists: typeof checkExistsFn;
    checkAccess: typeof checkAccessFn;
    getAuthorizedMe: (message?: string) => NonNullable<AppContext['me']>;
  };
type PageWrapperProps<
  TProps extends Props,
  TQueryResult extends QueryResult | undefined,
> = {
  redirectedAuthorized?: boolean;

  authorizedOnly?: boolean;
  authorizedOnlyTitle?: string;
  authorizedOnlyMessage?: string;

  checkAccess?: (helperProps: HelperProps<TQueryResult>) => boolean;
  checkAccessTitle?: string;
  checkAccessMessage?: string;

  checkExists?: (helperProps: HelperProps<TQueryResult>) => boolean;
  checkExistsTitle?: string;
  checkExistsMessage?: string;

  useQuery?: () => TQueryResult;
  setProps?: (setPropsProps: SetPropsProps<TQueryResult>) => TProps;
  Page: FC<TProps>;
};

const PageWrapper = <
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  TProps extends Props = {},
  TQueryResult extends QueryResult | undefined = undefined,
>({
  redirectedAuthorized,
  authorizedOnly,
  authorizedOnlyTitle = 'Please Authorize',
  authorizedOnlyMessage = 'This page is available for authorized users only',
  checkAccess,
  checkAccessTitle = 'Access Denied',
  checkAccessMessage = "You don't have access to this page",
  checkExists,
  checkExistsTitle = 'Not Found',
  checkExistsMessage = 'This page does not exist',
  useQuery,
  setProps,
  Page,
}: PageWrapperProps<TProps, TQueryResult>) => {
  const navigate = useNavigate();
  const ctx = useAppContext();
  const queryResult = useQuery?.();

  const getAuthorizedMe = (message?: string) => {
    if (!ctx.me) {
      throw new GetAuthorizedMeError(message);
    }

    return ctx.me;
  };

  const isRedirectNeeded = redirectedAuthorized && !ctx.me;

  useEffect(() => {
    if (isRedirectNeeded) {
      void navigate(getViewSignInRoute(), { replace: true });
    }
  }, [isRedirectNeeded, navigate]);

  if (queryResult?.isLoading || queryResult?.isFetching || isRedirectNeeded) {
    return <p>Loading...</p>;
  }

  if (queryResult?.isError) {
    const errorMessage =
      queryResult.error instanceof Error
        ? queryResult.error.message
        : String(queryResult.error);
    return (
      <ErrorPageComponent title={'Something goes wrong :('} description={errorMessage} />
    );
  }

  if (authorizedOnly && !ctx.me) {
    return (
      <ErrorPageComponent
        title={authorizedOnlyTitle}
        description={authorizedOnlyMessage}
      />
    );
  }

  const helperProps: HelperProps<TQueryResult> = {
    ctx,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    queryResult: queryResult as never,
  };

  if (checkAccess && !checkAccess(helperProps)) {
    return (
      <ErrorPageComponent title={checkAccessTitle} description={checkAccessMessage} />
    );
  }

  if (checkExists && !checkExists(helperProps)) {
    return <NotFoundPage title={checkExistsTitle} description={checkExistsMessage} />;
  }

  try {
    const props: TProps =
      setProps?.({
        ...helperProps,
        checkExists: checkExistsFn,
        checkAccess: checkAccessFn,
        getAuthorizedMe,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      }) ?? ({} as TProps);

    return <Page {...props} />;
  } catch (error) {
    if (error instanceof CheckExistsError) {
      return (
        <NotFoundPage
          title={checkExistsTitle}
          description={checkExistsMessage || error.message}
        />
      );
    }

    if (error instanceof CheckAccessError) {
      return (
        <ErrorPageComponent
          title={checkAccessTitle}
          description={checkAccessMessage || error.message}
        />
      );
    }

    if (error instanceof GetAuthorizedMeError) {
      return (
        <ErrorPageComponent
          title={authorizedOnlyTitle}
          description={authorizedOnlyMessage || error.message}
        />
      );
    }

    throw error instanceof Error ? error : new Error(String(error));
  }
};

export const withPageWrapper =
  <TProps extends Props, TQueryResult extends QueryResult | undefined = undefined>(
    pageWrapperProps: Omit<PageWrapperProps<TProps, TQueryResult>, 'Page'>
  ) =>
  (Page: PageWrapperProps<TProps, TQueryResult>['Page']) =>
  // eslint-disable-next-line react/display-name
  () => <PageWrapper {...pageWrapperProps} Page={Page} />;

import {
  type BaseQueryFn,
  type FetchArgs,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

export const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.BASE_URL,
  credentials: 'include',
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refresh = await rawBaseQuery(
      // url 수정 필요
      { url: '/api/users/auth/refresh', method: 'POST' },
      api,
      extraOptions,
    );

    if (refresh.data) {
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // api.dispatch(authLoggedOut());
    }
  }
  return result;
};

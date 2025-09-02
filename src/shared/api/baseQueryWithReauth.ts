import {
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import type { RefreshResponse } from '@shared-types/authTypes';
import { authStorage } from '@utils/authStorage';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

export const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = authStorage.getToken();
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

async function refreshToken(
  api: BaseQueryApi,
  extraOptions: Record<string, never>,
): Promise<boolean> {
  const res = await rawBaseQuery(
    { url: '/api/users/auth/admin-refresh', method: 'POST' },
    api,
    extraOptions,
  );
  const data = res.data as RefreshResponse | undefined;

  if (data?.success && data.data?.token) {
    authStorage.setToken(data.data.token);
    return true;
  }

  authStorage.setToken(null);
  return false;
}

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const isRefresh =
      typeof args === 'object' && (args as FetchArgs).url?.includes('/admin-refresh');

    if (!isRefresh) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const ok = await refreshToken(api, extraOptions);
          if (ok) {
            result = await rawBaseQuery(args, api, extraOptions);
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await rawBaseQuery(args, api, extraOptions);
      }
    }
  }
  return result;
};

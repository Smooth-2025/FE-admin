import { baseQueryWithReauth } from '@api/baseQueryWithReauth';
import { createApi } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Potholes', 'Reports'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});

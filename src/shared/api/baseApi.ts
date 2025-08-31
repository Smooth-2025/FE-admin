import { baseQueryWithReauth } from '@api/baseQueryWithReauth';
import { createApi } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Pothole', 'Report'],
  endpoints: () => ({}),
});

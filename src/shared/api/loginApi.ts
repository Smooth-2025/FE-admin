import { baseApi } from '@api/baseApi';
import type { LoginRequest, LoginResponse } from '@shared-types/authTypes';

export const loginApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/api/users/auth/adminlogin',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = loginApi;

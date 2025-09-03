import { baseApi } from '@api/baseApi';
import type { ApiResponse } from '@shared-types/apiResponse';
import type { LoginRequest, LoginResponse } from '@shared-types/authTypes';
import { authStorage } from '@utils/authStorage';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/api/users/auth/admin-login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      }),
      invalidatesTags: ['Auth'],

      async onQueryStarted(_arg, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (data?.success && data.data?.token) {
          authStorage.setToken(data.data.token);
          authStorage.setName(data.data.name);
        }
      },
    }),
    logout: build.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: '/api/users/auth/admin-logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],

      async onQueryStarted(_arg, { queryFulfilled }) {
        await queryFulfilled;
        authStorage.setToken(null);
        authStorage.setName(null);
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useLogoutMutation } = authApi;

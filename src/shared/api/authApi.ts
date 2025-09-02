import { baseApi } from '@api/baseApi';
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
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApi;

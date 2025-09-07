import { baseApi } from '@api/baseApi';
import type { ApiResponse } from '@shared-types/apiResponse';
import type {
  ConfirmPotholeRequest,
  ConfirmPotholeResponse,
  PagedResponse,
  PotholeResponse,
} from '@shared-types/potholeTypes';
import { type Pothole } from '@shared-types/potholeTypes';

export type PotholeListParams = {
  page?: number;
  start?: string | null;
  end?: string | null;
  confirmed: string | null;
};

const buildParams = (p: PotholeListParams) => ({
  page: p.page ?? 0,
  start: p.start ?? null,
  end: p.end ?? null,
  confirmed: p.confirmed,
});

export const potholeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPotholeList: build.query<PagedResponse<Pothole>, PotholeListParams>({
      query: (args) => ({
        url: '/api/pothole/data',
        method: 'GET',
        params: buildParams(args),
      }),
      transformResponse: (res: PotholeResponse): PagedResponse<Pothole> => res.data!,
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const p = buildParams(queryArgs);
        return `${endpointName}|page=${p.page}&start=${p.start}&end=${p.end}&confirmed=${p.confirmed}`;
      },
      providesTags: (result) =>
        result?.content
          ? [
            ...result.content.map((i: Pothole) => ({
              type: 'Potholes' as const,
              id: i.potholeId,
            })),
            { type: 'Potholes' as const, id: 'LIST' },
          ]
          : [{ type: 'Potholes' as const, id: 'LIST' }],
      keepUnusedDataFor: 3600,
    }),
    confirmPothole: build.mutation<ConfirmPotholeResponse, ConfirmPotholeRequest>({
      query: (body) => ({
        url: '/api/pothole/data/confirm',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Potholes', id: 'LIST' }],
    }),
    getAllPotholes: build.query<Pothole[], void>({
      query: () => ({
        url: '/api/pothole/data/all',
        method: 'GET',
      }),
      transformResponse: (res: ApiResponse<Pothole[]>): Pothole[] => res.data || [],
      providesTags: (result) =>
        result
          ? [
            ...result.map((i: Pothole) => ({
              type: 'Potholes' as const,
              id: i.potholeId,
            })),
            { type: 'Potholes' as const, id: 'ALL' },
          ]
          : [{ type: 'Potholes' as const, id: 'ALL' }],
      keepUnusedDataFor: 3600,
    }),
  }),
  overrideExisting: false,
});

export const { useGetPotholeListQuery, useLazyGetPotholeListQuery, useConfirmPotholeMutation, useGetAllPotholesQuery } =
  potholeApi;

import { baseApi } from '@api/baseApi';
import type { PagedResponse, PotholeResponse } from '@shared-types/potholeTypes';
import { type Pothole } from '@shared-types/potholeTypes';

export type PotholeListParams = {
  page?: number;
  start: string;
  end: string;
  confirmed: boolean | null;
};

const buildParams = (p: PotholeListParams) => ({
  page: p.page ?? 0,
  start: p.start,
  end: p.end,
  confirmed: p.confirmed === null ? 'null' : String(p.confirmed),
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
  }),
  overrideExisting: false,
});

export const { useGetPotholeListQuery } = potholeApi;

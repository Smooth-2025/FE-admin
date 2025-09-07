import { baseApi } from '@api/baseApi';
import { type Report } from '@shared-types/ReportTypes';

import type { PagedResponse, ReportResponse, ScaleType } from '@/shared/types/ReportTypes';

export type ReportListParams = {
  page?: number;
  start?: string | null;
  end?: string | null;
  type: ScaleType | null;
};

const buildParams = (p: ReportListParams) => ({
  page: p.page ?? 0,
  start: p.start ?? null,
  end: p.end ?? null,
  ...(p.type !== null ? { type: p.type } : {}),
});

export const reportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReportList: build.query<PagedResponse<Report>, ReportListParams>({
      query: (args) => ({
        url: '/api/report/data',
        method: 'GET',
        params: buildParams(args),
      }),
      transformResponse: (res: ReportResponse): PagedResponse<Report> => res.data!,
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const p = buildParams(queryArgs);
        console.log(p);
        let key = `${endpointName}|page=${p.page}&start=${p.start}&end=${p.end}`;
        if (p.type !== null) {
          key += `&type=${p.type}`;
        }
        return key;
      },
      providesTags: (result) =>
        result?.content
          ? [
              ...result.content.map((i: Report) => ({
                type: 'Reports' as const,
                id: i.accidentId,
              })),
              { type: 'Reports' as const, id: 'LIST' },
            ]
          : [{ type: 'Reports' as const, id: 'LIST' }],
      keepUnusedDataFor: 3600,
    }),
  }),
  overrideExisting: false,
});

export const { useGetReportListQuery, useLazyGetReportListQuery } = reportApi;

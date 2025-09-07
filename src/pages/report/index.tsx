import * as S from '@report/ReportPage.style';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ReportFilter from '@/pages/report/components/table/ReportFilter';
import ReportTable from '@/pages/report/components/table/ReportTable';
import { useLazyGetReportListQuery } from '@/shared/api/reportApi';

type ScaleType = 'all' | 'medium' | 'high';

export type FilterData = {
  page: number;
  start: string;
  end: string;
  scale: ScaleType;
};

export default function ReportPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultPage = Number(searchParams.get('page') || 1);
  const defaultStart = searchParams.get('start') || '2025-08-01';
  const defaultEnd = searchParams.get('end') || dayjs().format('YYYY-MM-DD');
  const scaleParam = searchParams.get('scale');
  const defaultType: ScaleType =
    !scaleParam || scaleParam === 'all' ? 'all' : (scaleParam as ScaleType);

  const [filterData, setFilterData] = useState<FilterData>({
    page: defaultPage,
    start: defaultStart ?? '',
    end: defaultEnd ?? '',
    scale: defaultType,
  });
  const [trigger, { data, isLoading }] = useLazyGetReportListQuery();

  const handleSearch = () => {
    trigger({
      ...filterData,
      page: 0,
      scale: filterData.scale === 'all' ? null : filterData.scale,
    });
    setSearchParams({
      ...filterData,
      page: String(1),
    });
    setFilterData({
      ...filterData,
      page: 1,
    });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handlePageChange = (newPage: number) => {
    setFilterData({ ...filterData, page: newPage });
    trigger({
      ...filterData,
      page: newPage - 1,
      scale: filterData.scale === 'all' ? null : filterData.scale,
    });
    setSearchParams({ ...filterData, page: String(newPage) });
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.ReportSection>
          <ReportFilter
            filterData={filterData}
            setFilterData={setFilterData}
            onSearch={handleSearch}
          />
        </S.ReportSection>

        <ReportTable
          data={data?.content}
          isLoading={isLoading}
          currentPage={filterData.page}
          onPageChange={handlePageChange}
          pageSize={data?.totalPages ?? 1}
        />
      </S.Wrapper>
    </S.Container>
  );
}

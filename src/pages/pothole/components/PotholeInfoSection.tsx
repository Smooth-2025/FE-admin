import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import DownloadExcelButton from '@/pages/pothole/components/table/DownloadExcelButton';
import PotholeFilter from '@/pages/pothole/components/table/PotholeFilter';
import PotholeTable from '@/pages/pothole/components/table/PotholeTable';
import { useLazyGetPotholeListQuery } from '@/shared/api/potholeApi';

import * as S from './PotholeInfoSection.style';

type ConfirmedType = 'all' | 'true' | 'false';

export type FilterData = {
  start: string;
  end: string;
  confirmed: ConfirmedType;
};

export default function PotholeInfoSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultStart = searchParams.get('start') || '2025-08-01';
  const defaultEnd = searchParams.get('end') || dayjs().format('YYYY-MM-DD');
  const confirmedParam = searchParams.get('confirmed');
  const defaultConfirmed: ConfirmedType =
    !confirmedParam || confirmedParam === 'all' ? 'all' : (confirmedParam as ConfirmedType);

  const [filterData, setFilterData] = useState<FilterData>({
    start: defaultStart ?? '',
    end: defaultEnd ?? '',
    confirmed: defaultConfirmed,
  });

  const [trigger, { data, isLoading }] = useLazyGetPotholeListQuery();

  useEffect(() => {
    trigger({ page: 0, start: defaultStart, end: defaultEnd, confirmed: defaultConfirmed });
  }, [defaultConfirmed, defaultEnd, defaultStart, trigger]);

  const handleSearch = () => {
    trigger({
      page: 0,
      ...filterData,
    });
    setSearchParams({
      ...filterData,
    });
  };

  return (
    <>
      <S.Wrapper>
        <S.FilterSection>
          <PotholeFilter
            filterData={filterData}
            setFilterData={setFilterData}
            onSearch={handleSearch}
          />
        </S.FilterSection>

        <S.ActionSection>{data && <DownloadExcelButton data={data.content} />}</S.ActionSection>
      </S.Wrapper>

      {<PotholeTable data={data?.content} isLoading={isLoading} />}
    </>
  );
}

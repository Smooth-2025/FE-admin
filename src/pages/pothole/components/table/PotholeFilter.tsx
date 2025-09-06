import type { MenuProps } from 'antd';
import { Button, DatePicker, Dropdown } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

type ConfirmedType = FilterData['confirmed'];

import type { FilterData } from '@/pages/pothole/components/PotholeInfoSection';

import * as S from './PotholeFilter.style';

type PropsType = {
  filterData: FilterData;
  setFilterData: React.Dispatch<React.SetStateAction<FilterData>>;
  onSearch: () => void;
};

type ConfirmedMenuItem = {
  key: string;
  label: string;
};

const { RangePicker } = DatePicker;

const DROPDOWN_ITEMS: ConfirmedMenuItem[] = [
  { key: '1', label: '전체' },
  { key: '2', label: '확정' },
  { key: '3', label: '미확정' },
];

const CONFIRMED_MAP: Record<string, ConfirmedType> = {
  '1': 'all',
  '2': 'true',
  '3': 'false',
};

export default function PotholeFilter({ filterData, setFilterData, onSearch }: PropsType) {
  const handleRangePickerChange: RangePickerProps['onChange'] = (dates) => {
    if (dates) {
      setFilterData((prev) => ({
        ...prev,
        start: dates[0]?.format('YYYY-MM-DD') || '',
        end: dates[1]?.format('YYYY-MM-DD') || '',
      }));
    }
  };

  const handleConfirmedChange: MenuProps['onClick'] = (e) => {
    setFilterData((prev) => ({
      ...prev,
      confirmed: CONFIRMED_MAP[e.key],
    }));
  };

  return (
    <S.FilterRow>
      <S.FilterItem>
        <span>발생 기간</span>
        <RangePicker
          format="YYYY/MM/DD"
          value={[dayjs(filterData.start), dayjs(filterData.end)]}
          onChange={handleRangePickerChange}
        />
      </S.FilterItem>

      <S.WideFilterItem>
        <span>처리 상태</span>
        <Dropdown
          menu={{ items: DROPDOWN_ITEMS, onClick: handleConfirmedChange }}
          placement="bottomLeft"
        >
          <Button>
            {filterData.confirmed === 'all'
              ? '전체'
              : filterData.confirmed === 'true'
                ? '확정'
                : '미확정'}
          </Button>
        </Dropdown>
      </S.WideFilterItem>

      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Button type="primary" onClick={onSearch}>
          조회
        </Button>
      </div>
    </S.FilterRow>
  );
}

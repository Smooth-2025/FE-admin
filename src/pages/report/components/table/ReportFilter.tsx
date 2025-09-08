import { Button, DatePicker, Dropdown, type MenuProps } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

import type { FilterData } from '@/pages/report';

import * as S from './ReportFilter.style';

type Type = FilterData['scale'];

type PropsType = {
  filterData: FilterData;
  setFilterData: React.Dispatch<React.SetStateAction<FilterData>>;
  onSearch: () => void;
};

type typeMenuItem = {
  key: string;
  label: string;
};

const { RangePicker } = DatePicker;

const DROPDOWN_ITEMS: typeMenuItem[] = [
  { key: '1', label: '전체' },
  { key: '2', label: '심각' },
  { key: '3', label: '보통' },
];

const SCALE_MAP: Record<string, Type> = {
  '1': 'all',
  '2': 'high',
  '3': 'medium',
};

export default function ReportFilter({ filterData, setFilterData, onSearch }: PropsType) {
  const handleRangePickerChange: RangePickerProps['onChange'] = (dates) => {
    if (dates) {
      setFilterData((prev) => ({
        ...prev,
        start: dates[0]?.format('YYYY-MM-DD') || '',
        end: dates[1]?.format('YYYY-MM-DD') || '',
      }));
    }
  };

  const handleTypeChange: MenuProps['onClick'] = (e) => {
    setFilterData((prev) => ({
      ...prev,
      scale: SCALE_MAP[e.key],
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
        <span>사고유형</span>
        <Dropdown
          menu={{ items: DROPDOWN_ITEMS, onClick: handleTypeChange }}
          placement="bottomLeft"
        >
          <Button>
            {filterData.scale === 'all' ? '전체' : filterData.scale === 'high' ? '심각' : '보통'}
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

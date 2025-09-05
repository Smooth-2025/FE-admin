import { Empty, Table } from 'antd';

import { columns } from '@/pages/pothole/components/table/TableColumns';
import type { Pothole } from '@/shared/types/potholeTypes';

import * as S from './PotholeTable.style';

type PropsType = {
  data?: Pothole[];
  isLoading: boolean;
};

export default function PotholeTable({ data = [], isLoading }: PropsType) {
  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="potholeId"
      bordered
      size="middle"
      loading={isLoading}
      locale={{
        emptyText: (
          <S.EmptyWrapper>
            <Empty description="데이터가 없습니다" />
          </S.EmptyWrapper>
        ),
      }}
    />
  );
}

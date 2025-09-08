export type ScaleType = 'medium' | 'high';
import { Empty } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import Table from 'antd/es/table';
import { useState } from 'react';

import BaseModal from '@/shared/components/modal/BaseModal';
import type { Report } from '@/shared/types/reportTypes';

import * as S from './ReportTable.style';

const PAGE_SIZE = 10;

type PropsType = {
  data?: Report[];
  isLoading: boolean;
  currentPage: number;
  onPageChange?: (page: number) => void;
  pageSize: number;
};

export default function ReportTable({
  data = [],
  isLoading,
  currentPage,
  onPageChange,
  pageSize,
}: PropsType) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Report | null>(null);

  const handleModalOpen = (selected: Report) => {
    if (!selected.accidentId) return;
    setSelectedData(selected);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  const columns: ColumnsType<Report> = [
    {
      title: 'ID',
      key: 'id',
      align: 'center',
      render: (_: unknown, __: Report, index: number) => (currentPage - 1) * PAGE_SIZE + index + 1,
    },
    {
      title: '사고 ID',
      dataIndex: 'accidentId',
      key: 'accidentId',
      align: 'center',
    },
    {
      title: '사용자',
      dataIndex: ['user', 'userName'],
      key: 'userName',
      align: 'center',
    },
    {
      title: '위치(위도/경도)',
      key: 'location',
      align: 'center',
      render: (_, record) => `${record.location.latitude}, ${record.location.longitude}`,
    },
    {
      title: '발생 시각',
      dataIndex: 'accidentAt',
      key: 'accidentAt',
      render: (value: string) => new Date(value).toLocaleString(),
      align: 'center',
    },
    {
      title: '사고유형',
      dataIndex: 'scale',
      key: 'scale',
      align: 'center',
      render: (value: ScaleType) => {
        return (
          <S.ScaleTag type={value}>
            {value === 'high' ? '심각' : value === 'medium' ? '보통' : ''}
          </S.ScaleTag>
        );
      },
    },
    {
      title: '더보기',
      key: 'more',
      render: (_: unknown, record: Report) => (
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => handleModalOpen(record)}
        >
          더보기
        </button>
      ),
      align: 'center',
    },
  ];

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const newPage = pagination.current ?? 1;
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="accidentId"
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
        pagination={{
          current: Math.max(currentPage, 1),
          pageSize: PAGE_SIZE,
          total: pageSize * PAGE_SIZE,
          position: ['bottomCenter'],
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
      />
      <BaseModal open={isModalOpen} onClose={handleClose} type="right">
        <S.ModalContent>
          {selectedData && (
            <>
              <S.Section>
                <h2>사용자 정보</h2>
                <S.InfoRow>
                  <label>ID</label>
                  <p>{selectedData.user?.userId}</p>
                </S.InfoRow>
                <S.InfoRow>
                  <label>사용자</label>
                  <p>{selectedData.user?.userName}</p>
                </S.InfoRow>
              </S.Section>
              <S.Section>
                <h2>사고 정보</h2>
                <S.InfoRow>
                  <label>사고시각</label>
                  <p>{new Date(selectedData.accidentAt).toLocaleString()}</p>
                </S.InfoRow>

                <S.InfoRow>
                  <label>GPS</label>
                  <p>
                    {selectedData.location?.latitude}, {selectedData.location?.longitude}
                  </p>
                </S.InfoRow>

                <S.InfoRow>
                  <label>심각도</label>
                  <p>
                    {selectedData.impulse},{' '}
                    {selectedData.scale === 'high'
                      ? '심각'
                      : selectedData.scale === 'medium'
                        ? '보통'
                        : '-'}
                  </p>
                </S.InfoRow>

                <S.InfoRow>
                  <label>신고 유무</label>
                  <p>
                    {selectedData.emergencyResponse?.emergencyNotified === true
                      ? '신고 완료'
                      : selectedData.emergencyResponse?.emergencyNotified === false
                        ? '미신고'
                        : '-'}
                  </p>
                </S.InfoRow>

                <S.InfoRow>
                  <label>119신고 시각</label>
                  <p>
                    {selectedData.emergencyResponse?.reportedAt
                      ? new Date(selectedData.emergencyResponse.reportedAt).toLocaleString()
                      : '-'}
                  </p>
                </S.InfoRow>

                <S.InfoRow>
                  <label>응급 연락 문자 전송</label>

                  <p>
                    {selectedData.emergencyResponse?.familyNotified === true
                      ? '전송완료'
                      : selectedData.emergencyResponse?.familyNotified === false
                        ? '미전송'
                        : '-'}
                  </p>
                </S.InfoRow>
              </S.Section>
              <S.Section>
                <S.DrivingLogWrapper>
                  <h2>사고 10초간 주행기록</h2>

                  <S.TableBox>
                    <S.DrivingLogHeader>
                      <div>시점</div>
                      <div>속도</div>
                      <div>감속률</div>
                      <div>브레이크</div>
                      <div>가속 페달</div>
                    </S.DrivingLogHeader>

                    {selectedData.drivingLogs.map((log, index) => (
                      <S.DrivingLogRow key={index}>
                        <div>{log.timeOffsetSeconds}초</div>
                        <div>{log.speed} km/h</div>
                        <div>{log.decelerationRate}</div>
                        <div>{log.brakePedal ? 'ON' : 'OFF'}</div>
                        <div>{log.acceleratorPedal ? 'ON' : 'OFF'}</div>
                      </S.DrivingLogRow>
                    ))}
                  </S.TableBox>
                </S.DrivingLogWrapper>
              </S.Section>
            </>
          )}
        </S.ModalContent>
      </BaseModal>
    </>
  );
}

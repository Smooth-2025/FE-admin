import { Empty, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { useState } from 'react';

import { useConfirmPotholeMutation } from '@/shared/api/potholeApi';
import BaseModal from '@/shared/components/modal/BaseModal';
import ToastAlert from '@/shared/components/ToastAlert';
import type { Pothole } from '@/shared/types/potholeTypes';

import * as S from './PotholeTable.style';

const PAGE_SIZE = 10;

type PropsType = {
  data?: Pothole[];
  isLoading: boolean;
  currentPage: number;
  onPageChange?: (page: number) => void;
  pageSize: number;
};

export default function PotholeTable({
  data,
  isLoading,
  currentPage,
  onPageChange,
  pageSize,
}: PropsType) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Pothole | null>(null);
  const [alertInfo, setAlertInfo] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null,
  );

  const handleModalOpen = (selected: Pothole) => {
    if (!selected.potholeId) return;
    setSelectedData(selected);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  const columns: ColumnsType<Pothole> = [
    {
      title: 'ID',
      key: 'id',
      align: 'center',
      render: (_: unknown, __: Pothole, index: number) => (currentPage - 1) * PAGE_SIZE + index + 1,
    },
    {
      title: '포트홀 ID',
      dataIndex: 'potholeId',
      key: 'potholeId',
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
      title: '발생 일자',
      dataIndex: 'detectedAt',
      key: 'detectedAt',
      align: 'center',
    },
    {
      title: '충격량(g)',
      dataIndex: 'impact',
      key: 'impact',
      align: 'center',
    },
    {
      title: '흔들림(Z)',
      dataIndex: 'shake',
      key: 'shake',
      align: 'center',
    },
    {
      title: '속도(km/h)',
      dataIndex: 'speed',
      key: 'speed',
      align: 'center',
    },
    {
      title: '이미지',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (_: string, record: Pothole) =>
        record.imageUrl ? (
          <S.ViewButton onClick={() => handleModalOpen(record)}>보기</S.ViewButton>
        ) : null,
      align: 'center',
    },
    {
      title: '심각 확정 여부',
      dataIndex: 'confirmed',
      key: 'confirmed',
      render: (value: boolean) =>
        value ? (
          <S.ConfirmedText>확정</S.ConfirmedText>
        ) : (
          <S.UnconfirmedText>미확정</S.UnconfirmedText>
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

  const [confirmPothole, { isLoading: isConfirming }] = useConfirmPotholeMutation();

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlertInfo({ type, message });
    setTimeout(() => setAlertInfo(null), 3000);
  };

  const handleConfirm = (potholeId: string) => {
    confirmPothole({ potholeId })
      .unwrap()
      .then((res) => {
        if (res.success) {
          showAlert('success', res.message || '포트홀 확정 처리가 완료되었습니다.');
          handleClose();
        } else {
          showAlert('error', '확정 요청이 실패했습니다.다시 시도해주세요.');
        }
      })
      .catch(() => {
        showAlert('error', '확정 요청이 실패하였습니다. 다시 시도해주세요.');
      });
  };

  return (
    <>
      {alertInfo && (
        <ToastAlert
          type={alertInfo.type}
          message={alertInfo.message}
          onClose={() => setAlertInfo(null)}
        />
      )}
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
        pagination={{
          current: Math.max(currentPage, 1),
          pageSize: PAGE_SIZE,
          total: pageSize * PAGE_SIZE,
          position: ['bottomCenter'],
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
      />
      <BaseModal open={isModalOpen} onClose={handleClose} title={'포트홀 이미지'}>
        <S.ModalContent>
          {selectedData && (
            <>
              <S.ImageWrapper>
                <img src={selectedData.imageUrl} alt="포트홀 이미지" />
              </S.ImageWrapper>
              <S.ConfirmButton
                onClick={() => handleConfirm(selectedData.potholeId)}
                disabled={isConfirming}
              >
                {!selectedData.confirmed ? '확정' : '확정 취소'}
              </S.ConfirmButton>
            </>
          )}
        </S.ModalContent>
      </BaseModal>
    </>
  );
}

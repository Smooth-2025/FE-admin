import { Empty, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import { POTHOLE_DUMI } from '@/pages/pothole/components/dumiData';
import BaseModal from '@/shared/components/modal/BaseModal';
import type { Pothole } from '@/shared/types/potholeTypes';

import * as S from './PotholeTable.style';

type PropsType = {
  data?: Pothole[];
  isLoading: boolean;
};

export default function PotholeTable({ data = POTHOLE_DUMI, isLoading }: PropsType) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleModalOpen = (url: string) => {
    setSelectedImage(url);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const columns: ColumnsType<Pothole> = [
    {
      title: 'ID',
      key: 'id',
      align: 'center',
      render: (_: unknown, __: Pothole, index: number) => index + 1,
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
      title: '발생 시각',
      dataIndex: 'detectedAt',
      key: 'detectedAt',
      render: (value: string) => new Date(value).toLocaleString(),
      align: 'left',
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
      render: (url?: string) =>
        url ? <S.ViewButton onClick={() => handleModalOpen(url)}>보기</S.ViewButton> : null,
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

  return (
    <>
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
      <BaseModal open={isModalOpen} onClose={handleClose} title={selectedImage ?? ''}>
        <S.ModalContent>
          {selectedImage && (
            <>
              <S.ImageWrapper>
                <img src={selectedImage} alt="포트홀 이미지" />
              </S.ImageWrapper>
              <S.ConfirmButton>위험확정</S.ConfirmButton>
            </>
          )}
        </S.ModalContent>
      </BaseModal>
    </>
  );
}

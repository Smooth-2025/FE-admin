import type { ColumnsType } from 'antd/es/table';

import type { Pothole } from '@/shared/types/potholeTypes';

export const columns: ColumnsType<Pothole> = [
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
    render: (url: string) => (
      <button onClick={() => window.open(url, '_blank')}>이미지 보기</button>
    ),
    align: 'center',
  },
  {
    title: '심각 확정 여부',
    dataIndex: 'confirmed',
    key: 'confirmed',
    render: (value: boolean) => (value ? '확인됨' : '미확인'),
    align: 'center',
  },
];

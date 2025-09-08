import * as S from '@pothole/potholePage.style';
import type { TabsProps } from 'antd';

import PotholeInfoSection from '@/pages/pothole/components/PotholeInfoSection';

import Heatmap from './components/heatmap/Heatmap';

const tabsItems: TabsProps['items'] = [
  {
    key: '1',
    label: '포트홀 정보',
    children: (
      <>
        <PotholeInfoSection />
      </>
    ),
  },
  {
    key: '2',
    label: '히트맵',
    children: (
      <Heatmap />
    ),
  },
];

export default function PotholePage() {
  return (
    <S.Container>
      <S.PotholeTabs defaultActiveKey="1" items={tabsItems} />
    </S.Container>
  );
}

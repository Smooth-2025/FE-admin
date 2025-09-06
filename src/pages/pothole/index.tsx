import * as S from '@pothole/potholePage.style';
import type { TabsProps } from 'antd';

import PotholeInfoSection from '@/pages/pothole/components/PotholeInfoSection';

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
    children: <>분포도</>,
  },
];

export default function PotholePage() {
  return (
    <S.Container>
      <S.PotholeTabs defaultActiveKey="1" items={tabsItems} />
    </S.Container>
  );
}

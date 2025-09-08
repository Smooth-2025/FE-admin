import styled from '@emotion/styled';
import { Tabs } from 'antd';

export const Container = styled.div`
  width: 90%;
  margin: 20px auto;
`;

export const PotholeTabs = styled(Tabs)`
  gap: 10px;
  .ant-tabs-nav::before {
    border-bottom: none !important;
  }
`;

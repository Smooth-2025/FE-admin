import styled from '@emotion/styled';

import type { ScaleType } from '@/shared/types/ReportTypes';

export const EmptyWrapper = styled.div`
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start
  padding: 16px;
  gap: 16px;
`;

export const Section = styled.div`
  margin-bottom: 24px;

  h2 {
    margin-bottom: 12px;
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSize[16]};
  }

  label {
    font-weight: 600;
    display: block;
    margin-bottom: 4px;
  }

  p {
    margin: 0 0 12px;
    color: ${({ theme }) => theme.colors.neutral500};
  }
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;

  label {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.neutral600};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.neutral600};
  }
`;
export const DrivingLogWrapper = styled.div`
  margin-top: 16px;
`;
export const TableBox = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral100};
  padding: 10px 20px;
  border-radius: 10px;
`;

export const DrivingLogHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  font-weight: 600;
  text-align: center;
  padding: 8px 0;
  font-size: ${({ theme }) => theme.fontSize[12]};
  color: ${({ theme }) => theme.colors.neutral600};
`;

export const DrivingLogRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;
  padding: 12px 0;
  font-size: ${({ theme }) => theme.fontSize[14]};
  color: ${({ theme }) => theme.colors.neutral600};
`;

export const ScaleTag = styled.span<{ type: ScaleType }>`
  background-color: ${({ type, theme }) =>
    type === 'high' ? theme.colors.danger200 : 'rgba(255, 215, 0, 0.2)'};
  color: ${({ type, theme }) =>
    type === 'high' ? theme.colors.danger600 : theme.colors.accent_orange};
  padding: 4px 15px;
  border-radius: 4px;
  font-weight: 500;
`;

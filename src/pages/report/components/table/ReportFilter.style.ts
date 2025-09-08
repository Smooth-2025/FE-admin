import styled from '@emotion/styled';

export const FilterRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-end;
`;

export const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  & span {
    font-size: ${({ theme }) => theme.fontSize[14]};
    font-weight: 500;
  }
`;

export const WideFilterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 120px;

  & span {
    font-size: ${({ theme }) => theme.fontSize[14]};
    font-weight: 500;
  }
`;

export const FilterAction = styled.div`
  display: flex;
  align-items: flex-end;
`;

import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: center;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize[64]};
  color: ${({ theme }) => theme.colors.white};
`;

export const SubTitle = styled.p`
  margin: 0 0 64px;
  font-size: ${({ theme }) => theme.fontSize[40]};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 200;
`;

export const BackButton = styled.button`
  margin: 0 auto;
  width: 80%;
  height: 48px;
  border: none;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSize[20]};
  color: ${({ theme }) => theme.colors.neutral700};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 12px 40px ${({ theme }) => theme.colors.black_a12};
`;

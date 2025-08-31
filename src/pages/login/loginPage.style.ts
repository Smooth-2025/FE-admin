import styled from '@emotion/styled';

export const Card = styled.div`
  width: 100%;
  max-width: 630px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 24px;
  box-shadow: 0 12px 40px ${({ theme }) => theme.colors.black_a12};
  padding: 80px 100px;
  z-index: 1;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize[32]};
  color: ${({ theme }) => theme.colors.neutral700};
  text-align: center;
`;

export const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize[18]};
  color: ${({ theme }) => theme.colors.neutral600};
  text-align: center;
`;

export const Form = styled.form`
  padding: 24px 0 48px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Error = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize[14]};
  color: ${({ theme }) => theme.colors.danger700};
`;

export const Submit = styled.button`
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSize[20]};
  color: ${({ theme }) => theme.colors.white};
  background: linear-gradient(90deg, #5aa8ff, #3a6bff);
  transition: opacity 0.2s ease;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

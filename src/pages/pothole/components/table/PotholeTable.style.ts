import styled from '@emotion/styled';

export const EmptyWrapper = styled.div`
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  gap: 16px;
`;

export const ImageWrapper = styled.div`
  max-width: 100%;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 16px;
  }
`;

export const ViewButton = styled.button`
  background: none;
  color: ${({ theme }) => theme.colors.neutral500};
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.neutral600};
  }
`;

export const ConfirmButton = styled.button`
  width: 80%;
  background: ${({ theme }) => theme.colors.danger600};
  color: ${({ theme }) => theme.colors.white};
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

export const ConfirmedText = styled.span`
  color: ${({ theme }) => theme.colors.danger600};
`;

export const UnconfirmedText = styled.span`
  color: ${({ theme }) => theme.colors.neutral500};
`;

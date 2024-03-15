import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/styles/colors';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function Button({ children, type, ...props }: ButtonProps): JSX.Element {
  const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    background-color: ${type === 'secondary'
      ? COLORS.bluePrimary
      : COLORS.redPrimary};
    color: ${COLORS.pureWhite};
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: ${type === 'secondary'
      ? 'none'
      : '0px 4px 9px 0px rgba(0, 0, 0, 0.25)'};

    &:hover {
      background-color: ${type === 'secondary'
        ? COLORS.blueSecondary
        : COLORS.redSecondary};
    }
  `;

  return <StyledButton {...props}>{children}</StyledButton>;
}

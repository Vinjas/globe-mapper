import { GlobalOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  gap: 1rem;
  text-align: left;
  padding: 1.5rem 0;
`;

const StyledH1 = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const StyledGlobalIcon = styled(GlobalOutlined)`
  font-size: 2.5rem;
  color: #333;
`;

export function Header() {
  return (
    <StyledHeader>
      <StyledGlobalIcon />
      <StyledH1>GlobeMapper</StyledH1>
    </StyledHeader>
  );
}

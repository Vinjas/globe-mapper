import Head from 'next/head';
import { Header } from '@/components/Header';
import styled from 'styled-components';
import { device } from '@/styles/breakpoints';

const StyledLayout = styled.div`
  height: 100%;
  padding: 0 8rem;

  @media ${device.xxl} {
    padding: 0 6rem;
  }

  @media ${device.xl} {
    padding: 0 4rem;
  }

  @media ${device.sm} {
    padding: 0 2rem;
  }

  @media ${device.xs} {
    padding: 0 1rem;
  }
`;

const StyledMain = styled.main`
  height: 100%;
`;

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledLayout>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <StyledMain>{children}</StyledMain>
    </StyledLayout>
  );
};

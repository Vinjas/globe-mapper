import styled from 'styled-components'
import styles from './header.module.scss'

const HeaderWrapper = styled.div`
  padding: 2rem;
  text-align: center;
`

export function Header() {
  return (
    <HeaderWrapper>
      <h1 className={styles.header__title}>GlobeMapper</h1>
    </HeaderWrapper>
  );
}
import MenuDrawer from '../../MenuDrawer'
import styles from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <MenuDrawer />
      <a href="/" className={styles.logo}>
        besider
      </a>
    </header>
  )
}

export default Header

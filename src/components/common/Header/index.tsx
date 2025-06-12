import styles from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.menu}></div>
      <a href="/" className={styles.logo}>
        besider
      </a>
    </header>
  )
}

export default Header

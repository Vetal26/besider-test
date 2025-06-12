import styles from './Footer.module.scss'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const navItems = [
    { path: '#', label: 'Log In' },
    { path: '#', label: 'About Us' },
    { path: '#', label: 'Publishers' },
    { path: '#', label: 'Sitemap' },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.navigation}>
        {navItems.map((item) => (
          <a key={item.label} href={item.path} className={styles.navLink}>
            {item.label}
          </a>
        ))}
      </div>
      <div className={styles.poweredBy}>
        <p className={styles.text}>Powered by</p>
        <a
          href="https://developer.nytimes.com/docs/archive-product/1/routes/%7Byear%7D/%7Bmonth%7D.json/get"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        ></a>
      </div>

      <div className={styles.copyright}>
        © {currentYear} Besider. Inspired by Insider
      </div>
    </footer>
  )
}

export default Footer

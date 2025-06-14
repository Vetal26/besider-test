import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import styles from './MenuDrawer.module.scss'
import HamburgerIcon from '../../assets/images/icons/hamburger.svg?react'
import CloseIcon from '../../assets/images/icons/close.svg?react'

const MenuDrawer: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { path: '#', label: 'SCIENCE' },
    { path: '#', label: 'GENERAL' },
    { path: '#', label: 'ENTERTAINMENT' },
    { path: '#', label: 'TECHNOLOGY' },
    { path: '#', label: 'BUSINESS' },
    { path: '#', label: 'HEALTH' },
    { path: '#', label: 'SPORTS' },
  ]

  return (
    <div className={styles.menu}>
      <IconButton aria-label="menu" onClick={() => setMenuOpen(true)}>
        <HamburgerIcon width={20} height={15.75} />
      </IconButton>
      <Drawer anchor="top" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <div className={styles.drawerContent}>
          <IconButton
            onClick={() => setMenuOpen(false)}
            className={styles.closeButton}
          >
            <CloseIcon width={20} height={20} />
          </IconButton>
          <nav className={styles.navigation}>
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li key={item.label} className={styles.navItem}>
                  <a href={item.path} className={styles.navLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Drawer>
    </div>
  )
}

export default MenuDrawer

import type { PropsWithChildren } from 'react'
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'
import styles from './MainLayout.module.scss'

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout

import styles from './Loader.module.scss'
import loadingPng from '../../assets/images/loading.png'

const Loader = () => {
  return (
    <div className={styles.loader}>
      <img src={loadingPng} alt="loading" className={styles.rotatingImage} />
    </div>
  )
}

export default Loader

// import { Affix } from 'antd'
// import { Footer } from '../components/Footer'
// import { GlobalDataLoader } from '../components/GlobalDataLoader'
// import { GlobalDocker } from '../components/GlobalDocker'
// import { Header } from '../components/Header'
// import { LoginWindow } from '../components/LoginWindow'
import styles from './MainLayout.module.scss'

export const MainLayout: React.FC = ({ children }) => {
  return (
    <div className={styles.golbalPage}>
      {/* <Affix offsetTop={0}>
        <Header />
      </Affix> */}
      <div style={{ background: '#fff', paddingTop: 10 }}>
        {/* <LoginWindow />
        <GlobalDataLoader />
        <GlobalDocker /> */}
        {/* 页面内容 content */}
        <div className={styles.pageContent}>{children}</div>
        {/* <Footer /> */}
      </div>
    </div>
  )
}

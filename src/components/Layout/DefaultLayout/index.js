import NavBar from './NavBar'
import Footer from '../DefaultLayout/Footer'
import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    return (
        <>
            <NavBar />
            <div className={cx('wrapper')}>
                {children}
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default DefaultLayout;
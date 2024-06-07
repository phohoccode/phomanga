import NavBar from './NavBar'
import Footer from '../DefaultLayout/Footer'
import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { scrollToTop } from '../../../utils'

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    const params = useParams()
    const [isShowButtonScroll, setIsShowButtonScroll] = useState(false)

    useEffect(() => {
        scrollToTop()
    }, [params])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 2000) {
                setIsShowButtonScroll(true)
            } else {
                setIsShowButtonScroll(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <NavBar />
            <div className={cx('wrapper')}>
                {children}
            </div>
            <Footer />
            {isShowButtonScroll &&
                <div 
                    title='Cuộn lên đầu trang'
                    onClick={scrollToTop} className={cx('scroll-to-top')}>
                    <i className="fa-solid fa-arrow-up"></i>
                </div>
            }
        </>
    )
}

export default DefaultLayout;
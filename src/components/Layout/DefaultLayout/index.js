import NavBar from './NavBar'
import Footer from '../DefaultLayout/Footer'
import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { scrollToTop } from '../../../utils'
import { Toaster } from 'react-hot-toast'
import Context from '../../../Context'

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    const { theme } = useContext(Context)
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
        <div className={cx(theme)}>
            <NavBar />
            <div className={cx('wrapper')}>
                {children}
            </div>
            <Footer />
            <div>
                <Toaster
                    position="top-center"
                    reverseOrder={true}
                    toastOptions={{
                        className: '',
                        duration: 5000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                        },
                    }}
                />
            </div>
            {isShowButtonScroll &&
                <div
                    onClick={scrollToTop} className={cx('scroll-to-top')}>
                    <i className="fa-solid fa-arrow-up"></i>
                </div>
            }
        </div>
    )
}

export default DefaultLayout
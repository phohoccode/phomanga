import { useContext, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import styles from './NavBar.module.scss'
import useFetch from '../../../../hooks/useFetch'
import Category from '../../components/Category'
import NavBarMobile from '../NavBarMobile'
import logo from './logo.png'
import Context from '../../../../Context'

const cx = classNames.bind(styles)

function NavBar() {
    const { theme, setTheme } = useContext(Context)
    const [data] = useFetch('https://otruyenapi.com/v1/api/the-loai')
    const [valueSearch, setValueSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const isMobile = width < 1024

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleKeyDownSearch = (e, value) => {
        if (e.key.startsWith('Enter') && value !== '') {
            navigate(`/search/${value}`)
        }
    }

    const handleSetTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    }

    return (
        <div className={cx('wrapper')}>
            <div style={isMobile ? wrapperLeft : {}}
                className={cx('wrapper-left')}>
                {isMobile &&
                    <button
                        className={cx('bars')}
                        onClick={() => setShowModal(!showModal)}
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                }
                <div className={cx('logo')}>
                    <NavLink to='/'>
                        <img src={logo} />
                    </NavLink>
                    <h4>Thế giới truyện tranh</h4>
                </div>
                {!isMobile &&
                    <ul className={cx('list')}>
                        <li className={cx('item', { 'active': pathname === '/' })}>
                            <NavLink to='/'>
                                <i className="fa-solid fa-house"></i>
                                Trang chủ
                            </NavLink>
                        </li>
                        <li className={cx('item', { 'active': pathname === '/detail/danh-sach/truyen-moi' })}>
                            <NavLink to='/detail/danh-sach/truyen-moi'>
                                <i className="fa-solid fa-rotate"></i>
                                Mới cập nhật
                            </NavLink>
                        </li>
                        <li className={cx('item')}>
                            <NavLink>
                                Thể loại
                                <i style={{ marginLeft: '6px' }} className="fa-solid fa-chevron-down"></i>
                            </NavLink>
                            {data?.data?.items &&
                                <Category categorys={data?.data?.items} />
                            }
                        </li>
                    </ul>
                }
            </div>
            {!isMobile &&
                <div className={cx('wrapper-right')}>
                    <div
                        title={theme === 'light' ? 'Chế độ sáng' : 'Chế độ tối'}
                        onClick={handleSetTheme} className={cx('theme')}>
                        <i className="fa-solid fa-circle-half-stroke"></i>
                    </div>
                    <NavLink
                        to='/history'
                        className={cx('history', { 'active': pathname === '/history' })}
                    >
                        <i className="fa-solid fa-clock-rotate-left"></i>
                    </NavLink>
                    <NavLink
                        to='/save'
                        className={cx('save', { 'active': pathname === '/save' })}
                    >
                        <i className="fa-regular fa-bookmark"></i>
                    </NavLink>
                    <div className={cx('container-search')}>
                        <input
                            value={valueSearch}
                            placeholder='Tìm kiếm...'
                            onChange={e => setValueSearch(e.target.value)}
                            onKeyDown={(e) => handleKeyDownSearch(e, valueSearch)}
                        />
                        <NavLink to={`/search/${valueSearch}`}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </NavLink>
                    </div>
                </div>
            }
            {data?.data?.items && isMobile &&
                <NavBarMobile
                    categorys={data?.data?.items}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    handleKeyDownSearch={handleKeyDownSearch}
                />
            }
        </div>
    )
}

export default NavBar

const wrapperLeft = {
    flex: 1,
    justifyContent: 'space-between'
}
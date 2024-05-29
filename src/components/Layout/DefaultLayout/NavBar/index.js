import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './NavBar.module.scss'
import useFetch from '../../../../hooks/useFetch'
import Category from '../../components/Category'
import NavBarMobile from '../NavBarMobile'

const cx = classNames.bind(styles)

function NavBar() {
    const [data] = useFetch('https://otruyenapi.com/v1/api/the-loai')
    const [valueSearch, setValueSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const { pathname } = useLocation()

    const isMobile = width < 768

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

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
                <NavLink to='/' className={cx('logo')}>PHOMANGA</NavLink>
                {!isMobile &&
                    <ul className={cx('list')}>
                        <li className={cx('item', { 'active': pathname === '/' })}>
                            <NavLink to='/'>
                                Trang chủ
                            </NavLink>
                        </li>
                        <li className={cx('item', { 'active': pathname === '/detail/danh-sach/truyen-moi' })}>
                            <NavLink to='/detail/danh-sach/truyen-moi'>
                                Mới cập nhật
                            </NavLink>
                        </li>
                        <li className={cx('item')}>
                            <NavLink>
                                Thể loại
                                <i className="fa-solid fa-chevron-down"></i>
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
                    <NavLink
                        to='/history'
                        title='Lịch sử đã xem'
                        className={cx('history', { 'active': pathname === '/history' })}>
                        <i className="fa-solid fa-clock-rotate-left"></i>
                    </NavLink>
                    <NavLink
                        to='/save'
                        title='Truyện đã lưu'
                        className={cx('save', { 'active': pathname === '/save' })}>
                        <i className="fa-regular fa-bookmark"></i>
                    </NavLink>
                    <div className={cx('container-search')}>
                        <input
                            value={valueSearch}
                            placeholder='Tìm kiếm...'
                            onChange={e => setValueSearch(e.target.value)}
                        />
                        <NavLink to={`/search/${valueSearch}`}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </NavLink>
                    </div>
                </div>
            }
            {data?.data?.items && 
                <NavBarMobile
                    categorys={data?.data?.items}
                    showModal={showModal}
                    setShowModal={setShowModal}
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
import classNames from 'classnames/bind'
import styles from './NavBarMobile.module.scss'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Category from '../../components/Category'

const cx = classNames.bind(styles)

function NavBarMovie({ categorys, showModal, setShowModal }) {
    const { pathname } = useLocation()
    const [valueSearch, setValueSearch] = useState('')
    const [showCategory, setShowCategory] = useState(false)


    return (
        <>
            {showModal &&
                <div className={cx('wrapper')}>
                    <div
                        style={showModal ? { right: '0' } : {}}
                        className={cx('modal')}>
                        <button
                            onClick={() => setShowModal(false)} 
                            className={cx('modal-close')}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
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
                                <NavLink onClick={() => setShowCategory(!showCategory)}>
                                    Thể loại
                                    <i className="fa-solid fa-chevron-down"></i>
                                </NavLink>
                                <Category 
                                    showCategory={showCategory}
                                    setShowCategory={setShowCategory}
                                    categorys={categorys} 
                                />
                            </li>
                            <li className={cx('item', { 'active': pathname === '/save' })}>
                                <NavLink to='/'>
                                    Truyện đã lưu
                                </NavLink>
                            </li>
                            <li className={cx('item', { 'active': pathname === '/history' })}>
                                <NavLink to='/'>
                                    Lịch sử đọc truyện
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>}
        </>
    )
}

export default NavBarMovie;
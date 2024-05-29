import classNames from 'classnames/bind'
import styles from './NavBarMobile.module.scss'
import { useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Category from '../../components/Category'

const cx = classNames.bind(styles)

function NavBarMovie({ categorys, showModal, setShowModal }) {
    const { pathname } = useLocation()
    const [valueSearch, setValueSearch] = useState('')
    const [showCategory, setShowCategory] = useState(false)
    const wrapperRef = useRef()
    const modalRef = useRef()

    const handleCloseModal = () => {
        if (modalRef.current && wrapperRef.current) {
            modalRef.current.classList.add(cx('slideOut'));
            wrapperRef.current.classList.add(cx('fadeOut'));
            setTimeout(() => {
                setShowModal(false);
            }, 400)
        }
    };

    return (
        <>
            {showModal &&
                <div
                    ref={wrapperRef}
                    className={cx('wrapper')}>
                    <div
                        ref={modalRef}
                        className={cx('modal')}>
                        <button
                            onClick={handleCloseModal}
                            className={cx('modal-close')}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <div className={cx('container-search')}>
                            <input
                                value={valueSearch}
                                placeholder='Tìm kiếm...'
                                onChange={e => setValueSearch(e.target.value)}
                            />
                            <NavLink 
                                onClick={handleCloseModal}
                                to={`/search/${valueSearch}`}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </NavLink>
                        </div>
                        <ul className={cx('list')}>
                            <li
                                onClick={handleCloseModal}
                                className={cx('item', { 'active': pathname === '/' })}>
                                <NavLink to='/'>
                                    Trang chủ
                                </NavLink>
                            </li>
                            <li
                                onClick={handleCloseModal}
                                className={cx('item', { 'active': pathname === '/detail/danh-sach/truyen-moi' })}>
                                <NavLink to='/detail/danh-sach/truyen-moi'>
                                    Mới cập nhật
                                </NavLink>
                            </li>
                            <li
                                onClick={handleCloseModal}
                                className={cx('item', { 'active': pathname === '/save' })}>
                                <NavLink to='/'>
                                    Truyện đã lưu
                                </NavLink>
                            </li>
                            <li
                                onClick={handleCloseModal}
                                className={cx('item', { 'active': pathname === '/history' })}>
                                <NavLink to='/'>
                                    Lịch sử đọc truyện
                                </NavLink>
                            </li>
                            <li
                                className={cx('item')}>
                                <NavLink onClick={() => setShowCategory(!showCategory)}>
                                    Thể loại
                                    <i className="fa-solid fa-chevron-down"></i>
                                </NavLink>
                                <Category
                                    handleCloseModal={handleCloseModal}
                                    showCategory={showCategory}
                                    categorys={categorys}
                                />
                            </li>
                        </ul>
                    </div>
                </div>}
        </>
    )
}

export default NavBarMovie


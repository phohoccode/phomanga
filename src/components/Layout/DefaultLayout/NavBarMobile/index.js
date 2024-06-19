import { NavLink, useLocation } from 'react-router-dom'
import { useContext, useRef, useState, Fragment } from 'react'
import classNames from 'classnames/bind'

import styles from './NavBarMobile.module.scss'
import Category from '../../components/Category'
import Context from '../../../../Context'

const cx = classNames.bind(styles)

function NavBarMovie({ categorys, showModal, setShowModal, handleKeyDownSearch }) {
    const { setTheme } = useContext(Context)
    const { pathname } = useLocation()
    const [valueSearch, setValueSearch] = useState('')
    const [showCategory, setShowCategory] = useState(false)
    const wrapperRef = useRef()
    const modalRef = useRef()

    const handleCloseModal = () => {
        if ((modalRef.current && wrapperRef.current) || showCategory) {
            setShowCategory(false)
            modalRef.current.classList.add(cx('slideOut'))
            wrapperRef.current.classList.add(cx('fadeOut'))
            setTimeout(() => {
                setShowModal(false)
            }, 400)
        }
    }

    const handleWrapperClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal()
        }
    };

    const handleSearch = (e, valueSearch) => {
        handleKeyDownSearch(e, valueSearch)
        if (e.key.startsWith('Enter')) {
            handleCloseModal()
        }
    }

    const handleSetTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
        handleCloseModal()
    }

    return (
        <Fragment>
            {showModal &&
                <div
                    onClick={handleWrapperClick}
                    ref={wrapperRef}
                    className={cx('wrapper')}>
                    <div
                        ref={modalRef}
                        className={cx('modal')}
                    >
                        <div className={cx('actions')}>
                            <button
                                onClick={handleSetTheme}
                                className={cx('theme')}
                            >
                                <i className="fa-solid fa-circle-half-stroke"></i>
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className={cx('close')}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className={cx('container-search')}>
                            <input
                                value={valueSearch}
                                placeholder='Tìm kiếm...'
                                onChange={e => setValueSearch(e.target.value)}
                                onKeyDown={(e) => handleSearch(e, valueSearch)}
                                />
                            <NavLink
                                style={{ pointerEvents: valueSearch !== '' ? 'auto' : 'none' }}
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
                                className={cx('item', { 
                                    'active': pathname === '/detail/danh-sach/truyen-moi' })}>
                                <NavLink to='/detail/danh-sach/truyen-moi'>
                                    Mới cập nhật
                                </NavLink>
                            </li>
                            <li
                                onClick={handleCloseModal}
                                className={cx('item', { 'active': pathname === '/save' })}>
                                <NavLink to='/save'>
                                    Truyện đã lưu
                                </NavLink>
                            </li>
                            <li
                                onClick={handleCloseModal}
                                className={cx('item', { 'active': pathname === '/history' })}>
                                <NavLink to='/history'>
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
        </Fragment>
    )
}

export default NavBarMovie


import classNames from 'classnames/bind'
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './BreadCrumb.module.scss'
const cx = classNames.bind(styles)

function BreadCrumb() {
    const { pathname } = useLocation()
    const [breadCrumb, setBreadCrumb] = useState([])

    useEffect(() => {
        setBreadCrumb(pathname.split('/').splice(1))
    }, [pathname])

    return (
        <ul className={cx('wrapper')}>
            <li>
                <Link to='/'>
                    Trang chủ
                </Link>
            </li>
            {breadCrumb.map((breadCrumb, index) => (
                <li key={index}>
                    {pathname !== '/' && 
                    <i className="fa-solid fa-angle-right"></i>}
                    <span>{breadCrumb.replace(/-/g, ' ')}</span>
                </li>
            ))}
        </ul>
    );
}

export default BreadCrumb;
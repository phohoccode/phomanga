import classNames from "classnames/bind"
import { NavLink, useLocation } from "react-router-dom"

import styles from './Category.module.scss'

const cx = classNames.bind(styles)

function Category({ categorys, showCategory, handleCloseModal }) {
    const { pathname } = useLocation()

    return (
        <ul
            style={showCategory ? { height: '60vh' } : {}}
            className={cx('wrapper')}>
            {categorys.map((category, index) => (
                <li
                    onClick={handleCloseModal}
                    className={cx('item', 
                        {'active' : pathname === `/detail/the-loai/${category?.slug}`})}
                    key={index}>
                    <NavLink
                        to={`/detail/the-loai/${category?.slug}`}
                    >
                        {category?.name}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}

export default Category
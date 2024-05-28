import classNames from "classnames/bind"
import { NavLink } from "react-router-dom";
import styles from './Category.module.scss'

const cx = classNames.bind(styles)

function Category({ categorys, showCategory, setShowCategory }) {

    return (
        <ul
            style={showCategory ? { height: '100vh' } : {}}
            className={cx('wrapper')}>
            {categorys.map((category, index) => (
                <li
                    className={cx('item')}
                    key={index}>
                    <NavLink
                        to={`/detail/the-loai/${category?.slug}`}
                    >
                        {category?.name}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}

export default Category;
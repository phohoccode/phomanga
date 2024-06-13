import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import styles from './NotFound.module.scss'

const cx = classNames.bind(styles)

function NotFound() {
    return (
        <div className={cx('wrapper')}>
            <h1>Oops!</h1>
            <h4>404 - Không tìm thấy trang</h4>
            <p>Có thể trang đã bị xóa, di chuyển hoặc URL bạn nhập không chính xác.</p>
            <p>Vui lòng kiểm tra lại URL hoặc trở về trang chủ.</p>
            <Link to='/'>Trở về trang chủ</Link>
        </div>
    );
}

export default NotFound;
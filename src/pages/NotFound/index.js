import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './NotFound.module.scss'

const cx = classNames.bind(styles)

function NotFound() {
    return (
        <div className={cx('wrapper')}>
            <h1>Oops!</h1>
            <h4>404 - Trang Không Tìm Thấy</h4>
            <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
            <p>Có thể trang đã bị xóa, di chuyển hoặc URL bạn nhập không chính xác. Vui lòng kiểm tra lại URL hoặc sử dụng thanh tìm kiếm bên dưới để tìm nội dung bạn cần.</p>
            <Link to='/'>Trở về trang chủ</Link>
        </div>
    );
}

export default NotFound;
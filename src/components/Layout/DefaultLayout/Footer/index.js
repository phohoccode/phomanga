import classNames from 'classnames/bind'

import styles from './Footer.module.scss'

const cx = classNames.bind(styles)

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <h4>Về chúng tôi</h4>
            <p>Chào mừng bạn đến với trang web truyện tranh của chúng tôi, nơi mang đến cho bạn trải nghiệm đọc truyện tuyệt vời nhất! Với giao diện dễ sử dụng, chúng tôi cam kết bạn sẽ tìm thấy và thưởng thức những bộ truyện tranh yêu thích một cách nhanh chóng và thuận tiện. Không quảng cáo phiền phức, bạn sẽ đắm chìm vào thế giới truyện tranh một cách trọn vẹn và không bị gián đoạn. Hãy khám phá ngay kho truyện phong phú và đa dạng của chúng tôi, và tận hưởng những phút giây giải trí thật thoải mái!</p>
            <p>
                Tất cả truyện tranh đều được tổng hợp từ nhiều nguồn uy tín và đáng tin cậy nhằm mang đến cho bạn kho nội dung phong phú và chất lượng nhất. Chúng tôi luôn tôn trọng quyền sở hữu trí tuệ và cố gắng đảm bảo rằng tất cả các tác phẩm đều tuân thủ quy định về bản quyền. Nếu bạn là tác giả hoặc đại diện pháp lý và nhận thấy nội dung nào trên trang web vi phạm bản quyền, xin vui lòng liên hệ với chúng tôi. Chúng tôi cam kết sẽ xem xét và giải quyết vấn đề một cách nhanh chóng và hợp lý, đảm bảo quyền lợi chính đáng của tất cả các bên liên quan.</p>
            <ul className={cx('socials')}>
                <li>
                    <a href="https://www.facebook.com/PHODEV.2004/" rel="noopener noreferrer" target="_blank">
                        <i className="fa-brands fa-facebook"></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/phodziet.04/" rel="noopener noreferrer" target="_blank">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.tiktok.com/@phohoccode.04/" rel="noopener noreferrer" target="_blank">
                        <i className="fa-brands fa-tiktok"></i>
                    </a>
                </li>
                <li>
                    <a href="https://t.me/phohoccode_04" rel="noopener noreferrer" target="_blank">
                        <i className="fa-brands fa-telegram"></i>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/phohoccode/" rel="noopener noreferrer" target="_blank">
                        <i className="fa-brands fa-github"></i>
                    </a>
                </li>
            </ul>
            <span>© 2024 - phohoccode</span>
        </div>
    );
}

export default Footer;
import { useContext, useRef } from 'react'
import classNames from 'classnames/bind'

import styles from './DiaLog.module.scss'
import Context from '../../../../Context'

const cx = classNames.bind(styles)

function DiaLog(props) {
    const { setIsOpenDiaLog } = useContext(Context)
    const mainRef = useRef()

    const handleOkClick = () => {
        props.onDeleteComment?.()
        props.onDeleteAll?.()
        props.onDeleteComic?.()
        setIsOpenDiaLog(false)
    }    

    const handleWrapperClick = (event) => {
        if (mainRef.current && !mainRef.current.contains(event.target)) {
            setIsOpenDiaLog(false)
        }
    }

    return (
        <div onClick={handleWrapperClick} className={cx('wrapper')}>
            <div className={cx('overplay')}></div>
            <div ref={mainRef} className={cx('main')}>
                <div className={cx('header')}>
                    <h4>Thông báo</h4>
                    <button
                        onClick={() => setIsOpenDiaLog(false)}
                        className={cx('close')}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className={cx('body')}>
                    <p>{props.text}</p>
                    <div className={cx('action')}>
                        <button
                            onClick={() => setIsOpenDiaLog(false)}
                            className={cx('cancel')}>Huỷ bỏ</button>
                        <button
                            onClick={handleOkClick}
                            className={cx('ok')}>Đồng ý</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiaLog
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Slide.module.scss'
const cx = classNames.bind(styles)

function Slide({ data }) {
    return (
        <div
            style={{
                backgroundImage: `url(https://otruyenapi.com/uploads/comics/${data?.thumb_url})`,
            }}
            className={cx('wrapper')}
        >
            <div className={cx('inner')}>
                <figure>
                    <img src={`https://otruyenapi.com/uploads/comics/${data?.thumb_url}`} />
                </figure>
                <div className={cx('info')}>
                    <h4>Chapter {data?.chaptersLatest[0]?.chapter_name}</h4>
                    <h2>{data?.name}</h2>
                    <ul className={cx('categorys')}>
                        {data?.category.map((category, index) => (
                            <li key={index}>
                                <Link to={`/detail/the-loai/${category?.slug}`}>{category?.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <div className={cx('actions')}>
                        <Link className={cx('read-now')} to={`/read/${data?._id}`}>Đọc ngay</Link>
                        <Link className={cx('detail')} to={`/info/${data?.slug}`}>Chi tiết</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Slide;
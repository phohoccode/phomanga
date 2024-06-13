import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import styles from './Slide.module.scss'

const cx = classNames.bind(styles)

function Slide({ data }) {
    const [chapterApi, setChapterApi] = useState('')

    useEffect(() => {
        if (data) {
            setChapterApi(data?.chaptersLatest?.[0]?.chapter_api_data.split('/').pop())
        }
    }, [data])

    return (
        <div
            style={{
                backgroundImage: `url(https://otruyenapi.com/uploads/comics/${data?.thumb_url})`,
            }}
            className={cx('wrapper')}
        >
            <div className={cx('inner')}>
                <figure>
                    <img 
                        src={`https://otruyenapi.com/uploads/comics/${data?.thumb_url}`} 
                        alt={data?.chaptersLatest?.[0]?.chapter_name}/>
                </figure>
                <div className={cx('info')}>
                    <h4>
                        {data?.chaptersLatest ?
                            `Chương ${data?.chaptersLatest?.[0]?.chapter_name}` :
                            'Truyện đang gặp lỗi!'
                        }
                    </h4>
                    <h2>{data?.name}</h2>
                    <ul className={cx('categorys')}>
                        {data?.category.map((category, index) => (
                            <li key={index}>
                                <Link to={`/detail/the-loai/${category?.slug}`}>{category?.name}</Link>
                            </li>
                        ))}
                    </ul>
                    {data?.chaptersLatest &&
                        <div className={cx('actions')}>
                            <Link
                                className={cx('read-now')}
                                to={`/read/${data?.slug}/${chapterApi}`}
                            >
                                <i className="fa-regular fa-eye"></i>
                                Đọc ngay
                            </Link>
                            <Link className={cx('detail')} to={`/info/${data?.slug}`}>
                                <i className="fa-solid fa-circle-info"></i>
                                Chi tiết
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Slide;
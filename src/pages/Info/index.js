import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Info.module.scss'
import useFetch from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { formatDate } from '../../utils'

const cx = classNames.bind(styles)

function Info() {
    const params = useParams()
    const [data] = useFetch(`https://otruyenapi.com/v1/api/truyen-tranh/${params.slug}`)
    const [item, setItem] = useState([])
    const [author, setAuthor] = useState([])
    const [category, setCategory] = useState([])
    const [chapters, setChapters] = useState([])

    useEffect(() => {
        console.log(data);
        setItem(data?.data?.item || [])
        setAuthor(data?.data?.item?.author || [])
        setCategory(data?.data?.item?.category || [])
        setChapters(data?.data?.item?.chapters[0]?.server_data)
        console.log(data?.data?.item?.chapters[0]?.server_data);
    }, [data])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <figure>
                    <img src={`https://otruyenapi.com/uploads/comics/${item?.thumb_url}`} alt={item?.name}/>
                </figure>
                <div className={cx('info')}>
                    <h4>{item?.name}</h4>
                    <ul className={cx('author')}>
                        <span>Tác giả: </span>
                        {author.map((author, index) => (
                            <li key={index}>{author}</li>
                        ))}
                    </ul>
                    <div className={cx('updated-at')}>
                        <p>Ngày cập nhật:</p>
                        <span>{formatDate(item?.updatedAt)}</span>
                    </div>
                    <ul className={cx('categorys')}>
                        <span>Thể loại: </span>
                        {category.map((category, index) => (
                            <li key={index}>
                                <Link to={`/detail/the-loai/${category?.slug}`}>{category?.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <div className={cx('content')}>
                        <span>Nội dung: </span>
                        <p dangerouslySetInnerHTML={{__html: item?.content}}></p>
                    </div>
                </div>
            </div>

            <div className={cx('chapters')}>
                {/* <div className={}></div> */}
            </div>
        </div>
    );
}

export default Info;

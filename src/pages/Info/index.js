import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Info.module.scss'
import useFetch from '../../hooks/useFetch'
import { useEffect, useRef, useState } from 'react'
import { formatDate } from '../../utils'
import ComicsSuggestions from '../../components/Layout/components/ComicsSuggestions'

const cx = classNames.bind(styles)

function Info() {
    const params = useParams()
    const [data] = useFetch(`https://otruyenapi.com/v1/api/truyen-tranh/${params.slug}`)
    const [item, setItem] = useState([])
    const [author, setAuthor] = useState([])
    const [category, setCategory] = useState([])
    const [chapters, setChapters] = useState([])
    const [valueSearch, setValueSearch] = useState('')

    useEffect(() => {
        setItem(data?.data?.item || [])
        setAuthor(data?.data?.item?.author || [])
        setCategory(data?.data?.item?.category || [])
        setChapters(data?.data?.item?.chapters[0]?.server_data || [])
    }, [data])

    const handleSearchChapter = (e) => {
        setValueSearch(e.target.value)
        const dataChapter = data?.data?.item?.chapters[0]?.server_data || []
        const filterChapters = 
            dataChapter.filter(
                chapter => 
                    chapter?.chapter_name.toLowerCase().includes(e.target.value.toLowerCase())
            )
        
        setChapters(filterChapters)
    }

    useEffect(() => {
        // console.log(chapters);
    }, [chapters])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <figure>
                    <img src={`https://otruyenapi.com/uploads/comics/${item?.thumb_url}`} alt={item?.name} />
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
                        <p dangerouslySetInnerHTML={{ __html: item?.content }}></p>
                    </div>
                </div>
            </div>

            <div className={cx('chapter-wrapper')}>
                <h4>Danh sách chương</h4>
                <div className={cx('search-chapter')}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                        value={valueSearch}
                        placeholder='Tìm chương...'
                        onChange={handleSearchChapter}
                    />
                </div>
                <ul className={cx('chapters')}>
                    {chapters.map((chapter, index) => (
                        <li key={index}>
                            <Link to={`/read/${params.slug}/${chapter?.chapter_api_data.split('/').pop()}`}>
                                Chương {chapter?.chapter_name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {data?.data && <ComicsSuggestions data={data?.data}/>}
        </div>
    );
}

export default Info;

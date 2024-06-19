import { Link, useParams } from 'react-router-dom'
import { useContext, useEffect, useState, Fragment } from 'react'
import classNames from 'classnames/bind'
import toast from 'react-hot-toast'

import styles from './Info.module.scss'
import useFetch from '../../hooks/useFetch'
import storage, { formatDate } from '../../utils'
import ComicsSuggestions from '../../components/Layout/components/ComicsSuggestions'
import Context from '../../Context'

const cx = classNames.bind(styles)

function Info() {
    const { setQuantityComic, width } = useContext(Context)
    const params = useParams()
    const [data] = useFetch(`https://otruyenapi.com/v1/api/truyen-tranh/${params.slug}`)
    const [item, setItem] = useState([])
    const [author, setAuthor] = useState([])
    const [category, setCategory] = useState([])
    const [chapters, setChapters] = useState([])
    const [idStorage, setIdStorage] = useState([])
    const [valueSearch, setValueSearch] = useState('')
    const [idRecently, setIdRecently] = useState('')
    const [isSave, setIsSave] = useState(false)
    const [isSort, setIsSort] = useState(false)

    useEffect(() => {
        if (data) {
            const historyStorage = storage.get('history-storage', {})
            const chapters = data?.data?.item?.chapters?.[0]?.server_data || []
            setItem(data?.data?.item || [])
            setAuthor(data?.data?.item?.author || [])
            setCategory(data?.data?.item?.category || [])
            setChapters(chapters)
            setIdStorage(() => {
                const chapterIds =
                    historyStorage[params.slug]?.map(
                        chapter => chapter?.data?.item?._id) || []
                return chapterIds
            })
            setIdRecently(() => {
                const comic = historyStorage[params.slug]
                if (comic) {
                    return comic[comic.length - 1]?.data?.item?._id
                }
                return chapters[chapters.length - 1]?.chapter_api_data.split('/').pop()
            })
        }
    }, [data, params.slug])

    useEffect(() => {
        const comicStorage = storage.get('comic-storage', [])
        const isSave = comicStorage.some(
            comic => comic?.slug === params.slug)
        setIsSave(isSave)
    }, [params.slug])

    const handleSearchChapter = (e) => {
        setValueSearch(e.target.value)
        const dataChapter = 
            data?.data?.item?.chapters?.[0]?.server_data || []
        const filterChapters =
            dataChapter.filter(
                chapter =>
                    chapter?.chapter_name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
            )
        setChapters(filterChapters)
    }

    const handleSaveComic = () => {
        const comicStorage = storage.get('comic-storage', [])
        const newComicStorage = [...comicStorage, data?.data?.item]
        storage.set('comic-storage', newComicStorage)
        setIsSave(!isSave)
        width > 1023 && setQuantityComic(newComicStorage.length)
        toast.success('Lưu truyện thành công!')
    }

    const handleDeleteComic = () => {
        const comicStorage = storage.get('comic-storage', [])
        const newComic = comicStorage.filter(
            comic => comic?.slug !== params.slug)
        storage.set('comic-storage', newComic)
        width > 1023 && setQuantityComic(newComic.length)
        setIsSave(!isSave)
        toast.success('Xoá truyện thành công!')
    }

    const handleSortComic = () => {
        const chapters = 
            data?.data?.item?.chapters?.[0]?.server_data || []
        setIsSort(!isSort)
        setChapters(chapters.reverse())
        setValueSearch('')
        isSort ? 
            toast('Chương được sắp xếp tăng dần', { duration: 2000 }) : 
            toast('Chương được sắp xếp giảm dần', { duration: 2000 })
    }

    return (
        <div className={cx('wrapper')}>
            {!data && <h4 className={cx('loading')}>Đang tải dữ liệu...</h4>}
            {data &&
                <Fragment>
                    <div className={cx('top')}>
                        <figure>
                            <img
                                src={`https://otruyenapi.com/uploads/comics/${item?.thumb_url}`}
                                alt={item?.name}
                            />
                        </figure>
                        <div className={cx('info')}>
                            <h4>{item?.name}</h4>
                            <div className={cx('actions')}>
                                {!isSave ? (
                                    <button onClick={handleSaveComic} className={cx('save')}>
                                        <i className="fa-solid fa-bookmark"></i>
                                        Lưu truyện
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleDeleteComic}
                                        className={cx('delete')}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                        Xoá truyện
                                    </button>
                                )}
                                <button className={cx('continue')}>
                                    <Link to={`/read/${params.slug}/${idRecently}`}>
                                        <i className="fa-regular fa-eye"></i>
                                        Đọc tiếp
                                    </Link>
                                </button>
                            </div>

                            <ul className={cx('item')}>
                                <b>Tác giả: </b>
                                {author.map((author, index) => (
                                    <li className={cx('text')} key={index}>{author || 'Chưa cập nhật'}</li>
                                ))}
                            </ul>
                            <div className={cx('item')}>
                                <b>Ngày cập nhật:</b>
                                <span className={cx('text')}>{formatDate(item?.updatedAt)}</span>
                            </div>
                            <ul className={cx('item')}>
                                <b>Thể loại: </b>
                                {category.map((category, index) => (
                                    <li key={index} className={cx('category')}>
                                        <Link to={`/detail/the-loai/${category?.slug}`}>
                                            {category?.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className={cx('item')}>
                                <b>Nội dung: </b>
                                <p
                                    className={cx('text')}
                                    dangerouslySetInnerHTML={{ __html: item?.content }}>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={cx('chapter-wrapper')}>
                        <div className={cx('title')}>
                            <h4>Danh sách chương</h4>
                            <button
                                title={!isSort ? 'Tăng dần' : 'Giảm dần'}
                                onClick={handleSortComic}
                                className={cx('btn-sort')}
                            >
                                {isSort ? (
                                    <i className="fa-solid fa-arrow-down-9-1"></i>
                                ) : (
                                    <i className="fa-solid fa-arrow-up-1-9"></i>
                                )}
                            </button>
                        </div>
                        <div className={cx('search-chapter')}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input
                                value={valueSearch}
                                placeholder='Nhập số chương cần tìm...'
                                onChange={handleSearchChapter}
                            />
                        </div>
                        <ul className={cx('chapters')}>
                            {chapters.length > 0 ?
                                <Fragment>
                                    <li>
                                        <Link
                                            to={`/read/${params.slug}/${chapters[chapters.length - 1]
                                                ?.chapter_api_data
                                                .split('/').pop()}`}
                                        >
                                            Đọc từ đầu
                                        </Link>
                                    </li>
                                    {chapters.map((chapter, index) => (
                                        <li
                                            className={cx({
                                                active:
                                                    idStorage.includes(chapter?.chapter_api_data.split('/').pop())
                                            })}
                                            key={index}>
                                            <Link
                                                to={`/read/${params.slug}/${chapter
                                                    ?.chapter_api_data
                                                    .split('/').pop()}`}
                                            >
                                                Chương {chapter?.chapter_name}
                                            </Link>
                                        </li>
                                    ))}
                                </Fragment> :
                                <span>Không có dữ liệu!</span>
                            }
                        </ul>
                    </div>
                </Fragment>
            }
            {data?.data && <ComicsSuggestions data={data?.data} />}
        </div>
    )
}

export default Info

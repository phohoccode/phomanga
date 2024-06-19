import classNames from 'classnames/bind'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useRef, useState, Fragment } from 'react'

import styles from './Read.module.scss'
import useFetch from '../../hooks/useFetch'
import storage from '../../utils'
import Comment from '../../components/Layout/components/Comment'
import toast from 'react-hot-toast'
import Context from '../../Context'

const cx = classNames.bind(styles)

function Read() {
    const { setQuantityComicHistory, width } = useContext(Context)
    const navigate = useNavigate()
    const params = useParams()
    const [data] = useFetch(`https://otruyenapi.com/v1/api/truyen-tranh/${params.slug}`)
    const [dataChapter] = useFetch(`https://sv1.otruyencdn.com/v1/api/chapter/${params.id}`)
    const [images, setImages] = useState([])
    const [chapter, setChapter] = useState([])
    const [chapterPath, setChapterPath] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isScroll, setIsScroll] = useState(false)
    const [isShowMessage, setIsShowMessage] = useState(false)
    const idScrollRef = useRef()

    useEffect(() => {
        if (data) {
            const chaptersId =
                data?.data?.item?.chapters[0]?.server_data.map(
                    chapter => chapter?.chapter_api_data.split('/').pop()) || []
            const index = chaptersId.findIndex(id => id === params.id)
            setChapter(chaptersId)
            setCurrentIndex(index)
        }
    }, [data])

    useEffect(() => {
        if (dataChapter) {
            setImages(dataChapter?.data?.item?.chapter_image || [])
            setChapterPath(dataChapter?.data?.item?.chapter_path)

            const historyStorage = storage.get('history-storage', {})
            const isExistComic = historyStorage[params.slug]?.some(
                comic => comic?.data?.item?._id === params.id) || false

            if (!isExistComic) {
                historyStorage[params.slug] =
                    [...(historyStorage[params.slug] || []), dataChapter]
                storage.set('history-storage', historyStorage)
                width > 1023 && 
                    setQuantityComicHistory(Object.keys(historyStorage).length)
            }
            toast(`Bạn đang ở chương ${dataChapter?.data?.item?.chapter_name}`, { duration: 2000 })
        }
    }, [dataChapter])

    useEffect(() => {
        const handleAutoScroll = () => {
            if (isScroll) {
                idScrollRef.current = setInterval(() => {
                    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                        clearInterval(idScrollRef.current)
                        setIsScroll(!isScroll)
                        toast("Đã cuộn đến cuối trang!")
                    } else {
                        window.scrollBy({
                            top: window.innerHeight,
                            behavior: 'smooth'
                        })
                    }
                }, 6000)
            } else {
                clearInterval(idScrollRef.current)
            }
        }
        handleAutoScroll()
        return () => clearInterval(idScrollRef.current)
    }, [isScroll])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key.startsWith('ArrowLeft')) {
                handlePrevChapter()
            } else if (event.key.startsWith('ArrowRight')) {
                handleNextChapter()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [currentIndex])

    const handleChangeChapter = (index) => {
        setCurrentIndex(index)
        navigate(`/read/${params.slug}/${chapter[index]}`)
    }

    const handlePrevChapter = () => {
        if (currentIndex > 0) {
            let index = currentIndex - 1
            handleChangeChapter(index)
        }
    }

    const handleNextChapter = () => {
        if (currentIndex < chapter.length - 1) {
            let index = currentIndex + 1
            handleChangeChapter(index)
        }
    }

    const handleOpenModal = () => {
        document.body.style.overflowY = 'hidden'
        setIsShowMessage(!isShowMessage)
    }

    const handleScroll = () => {
        const newIsScroll = !isScroll
        if (newIsScroll) {
            toast('Đã bật chế độ tự động cuộn!', { duration: 1000 })
        } else {
            toast('Đã tắt chế độ tự động cuộn!', { duration: 1000 })
        }
        setIsScroll(newIsScroll)
    }

    return (
        <Fragment>
            <div className={cx('wrapper')}>
                {!data && !dataChapter &&
                    <h4 className={cx('loading')}>Đang tải dữ liệu...</h4>}
                {data && dataChapter &&
                    <Fragment>
                        <div className={cx('title')}>
                            <h4>
                                {`${data?.data?.item?.name} - Chương ${dataChapter?.data?.item?.chapter_name}`}
                            </h4>
                            <p>
                                Gợi ý: Bạn có thể sử dụng nút
                                <i className="fa-solid fa-arrow-left"></i> hoặc
                                <i className="fa-solid fa-arrow-right"></i> từ bàn phím để chuyển chương.
                                <i className="fa-solid fa-arrow-down"></i> để tự động cuộn trang sau 6 giây.
                            </p>
                            <span>Nếu truyện bị lỗi vui lòng liên hệ qua Telegram:
                                <a href="https://t.me/phohoccode_04" target="_blank">phohoccode</a>
                            </span>
                        </div>
                        <div className={cx('actions')}>
                            <button
                                onClick={handlePrevChapter}
                                className={cx('prev', { 'disabled': currentIndex === 0 })}
                            >
                                <i className="fa-solid fa-angle-left"></i>
                                Chương trước
                            </button>
                            <button
                                onClick={handleNextChapter}
                                className={cx('next', { 'disabled': currentIndex === chapter.length - 1 })}
                            >
                                Chương sau
                                <i className="fa-solid fa-angle-right"></i>
                            </button>
                        </div>
                    </Fragment>
                }
                <ul className={cx('images')}>
                    {images.map((image, index) => (
                        <li key={index}>
                            <img src={`https://sv1.otruyencdn.com/${chapterPath}/${image.image_file}`} />
                        </li>
                    ))}
                </ul>
                <div className={cx('tools')}>
                    <button onClick={handleOpenModal}>
                        <i className="fa-regular fa-comment-dots"></i>
                        <span>Bình luận</span>
                    </button>
                    <button
                        className={cx('auto-scroll', { 'active': isScroll })}
                        onClick={handleScroll}>
                        <i className="fa-solid fa-arrow-down"></i>
                        {!isScroll ? (<span>Tự động cuộn</span>) : (<span>Đang cuộn</span>)}
                    </button>
                </div>
            </div>
            {isShowMessage &&
                <Comment
                    id={params.id}
                    slug={params.slug}
                    setIsShowMessage={setIsShowMessage}
                />
            }
        </Fragment>
    )
}

export default Read
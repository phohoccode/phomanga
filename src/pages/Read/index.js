import classNames from 'classnames/bind'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Read.module.scss'
import { useEffect, useRef, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import storage from '../../utils'
import Comment from '../../components/Layout/components/Comment'

const cx = classNames.bind(styles)

function Read() {
    const navigate = useNavigate()
    const params = useParams()
    const [data] = useFetch(`https://otruyenapi.com/v1/api/truyen-tranh/${params.slug}`)
    const [dataImages] = useFetch(`https://sv1.otruyencdn.com/v1/api/chapter/${params.id}`)
    const [images, setImages] = useState([])
    const [chapter, setChapter] = useState([])
    const [chapterPath, setChapterPath] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isScroll, setIsScroll] = useState(false)
    const [isShowMessage, setIsShowMessage] = useState(false)
    const idScrollRef = useRef()

    useEffect(() => {
        if (data) {
            console.log(data);
            const chaptersId =
                data?.data?.item?.chapters[0]?.server_data.map(
                    chapter => chapter?.chapter_api_data.split('/').pop()) || []
            const index = chaptersId.findIndex(id => id === params.id)
            setChapter(chaptersId)
            setCurrentIndex(index)
        }
    }, [data])

    useEffect(() => {
        if (dataImages) {
            setImages(dataImages?.data?.item?.chapter_image || [])
            setChapterPath(dataImages?.data?.item?.chapter_path)
            const historyStorage = storage.get('history-storage', {})

            const isExist = params.slug in historyStorage
            if (!isExist && dataImages?.status.startsWith('success')) {
                historyStorage[params.slug] = [...(historyStorage[params.slug] || []), dataImages]
                storage.set('history-storage', historyStorage)
            }
        }
    }, [dataImages])

    useEffect(() => {
        const handleAutoScroll = () => {
            if (isScroll && window.innerHeight + window.scrollY < document.body.offsetHeight) {
                idScrollRef.current = setInterval(() => {
                    window.scrollBy({
                        top: window.innerHeight, behavior: 'smooth'
                    })
                }, 6000)
            } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
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

    const checkExistChapterInHistory = async (chapterId) => {
        const historyStorage = storage.get('history-storage', {})
        const isExist = historyStorage[params.slug].some(
            comic => comic?.data?.item?._id === chapterId
        )
        if (!isExist) {
            const res = await fetch(`https://sv1.otruyencdn.com/v1/api/chapter/${chapterId}`)
            const dataImages = await res.json()

            if (dataImages?.status.startsWith('success')) {
                historyStorage[params.slug] = [...historyStorage[params.slug], dataImages]
                storage.set('history-storage', historyStorage)
            }
        }
    }

    const handleChangeChapter = (index) => {
        setCurrentIndex(index)
        navigate(`/read/${params.slug}/${chapter[index]}`)
        checkExistChapterInHistory(chapter[index])
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

    return (
        <>
            <div className={cx('wrapper')}>
                {data && dataImages &&
                    <div className={cx('title')}>
                        <h4>
                            {`${data?.data?.item?.name} - Chương ${dataImages?.data?.item?.chapter_name}`}
                        </h4>
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
                        <p>
                            Gợi ý: bạn có thể sử dụng nút
                            <i className="fa-solid fa-arrow-left"></i> hoặc
                            <i className="fa-solid fa-arrow-right"></i> từ bàn phím để chuyển chương
                        </p>
                    </div>
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
                        Bình luận
                    </button>
                    <button
                        className={cx('auto-scroll', { 'active': isScroll })}
                        onClick={() => setIsScroll(!isScroll)}>
                        <i className="fa-solid fa-arrow-down"></i>
                        {!isScroll ? 'Tự động cuộn' : 'Đang cuộn'}
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
        </>
    )
}

export default Read
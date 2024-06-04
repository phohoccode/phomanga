import classNames from 'classnames/bind'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Read.module.scss'
import { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import storage from '../../utils'

const cx = classNames.bind(styles)

function Read() {
    const navigate = useNavigate()
    const params = useParams()
    const [id, setId] = useState(params.id)
    const [data] = useFetch(`https://otruyenapi.com/v1/api/truyen-tranh/${params.slug}`)
    const [dataImages] = useFetch(`https://sv1.otruyencdn.com/v1/api/chapter/${id}`)
    const [images, setImages] = useState([])
    const [chapter, setChapter] = useState([])
    const [chapterPath, setChapterPath] = useState('')
    let [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (data && dataImages) {
            const historyStorage = storage.get('history-storage', {})
            const isExist = params.slug in historyStorage
            if (!isExist) {
                historyStorage[params.slug] = [...(historyStorage[params.slug] || []), dataImages]
                storage.set('history-storage', historyStorage)
            }
        }
    }, [data, dataImages])

    useEffect(() => {
        if (data) {
            console.log(data);
            const ids =
                data?.data?.item?.chapters[0]?.server_data.map(
                    chapter => chapter?.chapter_api_data.split('/').pop()) || []
            const index = ids.findIndex(id => id === params.id)
            setChapter(ids)
            setCurrentIndex(index)
        }
    }, [data])

    useEffect(() => {
        if (dataImages) {
            console.log(dataImages);
            setImages(dataImages?.data?.item?.chapter_image || [])
            setChapterPath(dataImages?.data?.item?.chapter_path)
        }
    }, [dataImages])

    const checkExistChapterInHistory = async (id) => {
        console.log(params.slug);
        const historyStorage = storage.get('history-storage', {})
        const isExist = historyStorage[params.slug].some(
            comic => comic?.data?.item?._id === id
        )
        if (!isExist) {
            const res = await fetch(`https://sv1.otruyencdn.com/v1/api/chapter/${id}`)
            const dataImages = await res.json()
            
            if (dataImages?.status.startsWith('success')) {
                historyStorage[params.slug] = [...historyStorage[params.slug], dataImages]
                storage.set('history-storage', historyStorage)
            }
        }
    }

    const handleChangeChapter = (index) => {
        const id = chapter[index]
        console.log(id);
        setId(chapter[index])
        setCurrentIndex(index)
        navigate(`/read/${params.slug}/${chapter[index]}`)
        checkExistChapterInHistory(id)
    }

    const handlePrevChapter = () => {
        if (currentIndex > 0) {
            let index = currentIndex - 1
            console.log('index', index);
            handleChangeChapter(index)
        }
    }

    const handleNextChapter = () => {
        if (currentIndex < chapter.length - 1) {
            let index = currentIndex + 1
            console.log('index', index);
            handleChangeChapter(index)
        }
    }

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

    return (
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
                </div>
            }
            <ul className={cx('images')}>
                {images.map((image, index) => (
                    <li key={index}>
                        <img src={`https://sv1.otruyencdn.com/${chapterPath}/${image.image_file}`} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Read;
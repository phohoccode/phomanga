import classNames from 'classnames/bind'
import { useParams } from 'react-router-dom'
import styles from './Read.module.scss'
import { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'

const cx = classNames.bind(styles)

function Read() {
    const params = useParams()
    const [id, setId] = useState(params.id)
    const [data] = useFetch(`https://otruyenapi.com/v1/api/truyen-tranh/${params.slug}`)
    const [dataImages] = useFetch(`https://sv1.otruyencdn.com/v1/api/chapter/${id}`)
    const [images, setImages] = useState([])
    const [chapter, setChapter] = useState([])
    const [chapterPath, setChapterPath] = useState('')

    useEffect(() => {
        console.log(params);
        // setId(params.id)
    }, [params])

    useEffect(() => {
        console.log(data?.data?.item?.chapters[0]?.server_data);
        setChapter(data?.data?.item?.chapters[0]?.server_data)
        setChapter()
    }, [data])

    useEffect(() => {
        console.log(dataImages);
        setImages(dataImages?.data?.item?.chapter_image || [])
        setChapterPath(dataImages?.data?.item?.chapter_path)
    }, [dataImages])

    return (
        <div className={cx('wrapper')}>
            {data?.data?.item &&
                <div className={cx('title')}>
                    <h4>{`${data?.data?.item?.name} - Chap ${dataImages?.data?.item?.chapter_name}`}</h4>
                    <div className={cx('actions')}>
                        <button className={cx('prev')}>
                            <i className="fa-solid fa-arrow-left"></i>
                            Trước
                        </button>
                        <button className={cx('next')}>
                            Sau
                            <i className="fa-solid fa-arrow-right"></i>
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
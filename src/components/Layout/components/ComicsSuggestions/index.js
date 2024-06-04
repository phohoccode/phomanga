import classNames from 'classnames/bind'
import styles from './ComicsSuggestions.module.scss'
import { useEffect, useState } from 'react'
import Comics from '../Comics'

const cx = classNames.bind(styles)

function ComicsSuggestions({ data }) {
    const [categorys, setCategorys] = useState([])
    const [currentApi, setCurrentApi] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        setCategorys(data?.item?.category || [])
        setCurrentApi(
            `https://otruyenapi.com/v1/api/the-loai/${data?.item?.category[0].slug}` || '')
        setCurrentIndex(0)
    }, [data])

    const handleSetApi = (slug, index) => {
        setCurrentIndex(index)
        setCurrentApi(`https://otruyenapi.com/v1/api/the-loai/${slug}`)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h4>Gợi ý truyện</h4>
                <ul className={cx('categorys')}>
                    {categorys.map((category, index) => (
                        <li
                            className={cx({'active': index === currentIndex})}
                            onClick={() => handleSetApi(category?.slug, index)}
                            key={index}>{category?.name}</li>
                    ))}
                </ul>
            </div>
            {currentApi && <Comics api={currentApi} />}
        </div>
    );
}

export default ComicsSuggestions;
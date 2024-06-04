import { Link } from 'react-router-dom'
import storage from '../../utils'
import classNames from 'classnames/bind'
import styles from './History.module.scss'
import stylesComics from '../../components/Layout/components/Comics/Comics.module.scss'
import stylesComic from '../../components/Layout/components/Comic/Comic.module.scss'
import { useEffect, useState } from 'react'

const cx = classNames.bind(styles)
const cxComics = classNames.bind(stylesComics)
const cxComic = classNames.bind(stylesComic)

function History() {
    const [comics, setComics] = useState({})
    const [slugs, setSlugs] = useState([])

    useEffect(() => {
        console.log(storage.get('history-storage', {}));
        const historyStorage = storage.get('history-storage', {})
        const slugs = Object.keys(historyStorage)
        setComics(historyStorage)
        setSlugs(slugs)
    }, [])

    const handleDeleteAll = () => {
        setSlugs([])
        setComics({})
        storage.set('history-storage', {})
    }

    return (
        <div style={{ margin: 'unset' }} className={cxComics('wrapper')}>
            <div className={cxComics('title')}>
                <h4>
                    {slugs.length > 0 ?
                        `Có ${slugs.length} truyện đã xem` :
                        'Lịch sử xem trống'}
                </h4>
                {slugs.length > 0 &&
                    <button onClick={handleDeleteAll}>Xoá tất cả</button>
                }
            </div>
            {slugs.map(slug => (
                <div key={slug} className={cx('wrapper')}>
                    <h4>{slug}</h4>
                    <ul key={slug} className={cxComics('list')}>
                        {comics[slug].map((comic, index) => (
                            <li key={index} className={cxComic('wrapper')}>
                                <Link to={`/read/${slug}/${comic?.data?.item?._id}`}>
                                    <figure>
                                        <img
                                            src={`https://sv1.otruyencdn.com/${comic?.data?.item?.chapter_path}/${comic?.data?.item?.chapter_image[index]?.image_file}`}
                                            alt={comic?.data?.item?.comic_name}
                                        />
                                    </figure>
                                    <div className={cxComic('info')}>
                                        <h4>{`${slug} - Chap ${comic?.data?.item?.chapter_name}`}</h4>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default History;
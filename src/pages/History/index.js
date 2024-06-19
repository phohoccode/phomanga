import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import toast from 'react-hot-toast'
import { useEffect, useState, useContext, Fragment } from 'react'

import styles from './History.module.scss'
import storage from '../../utils'
import stylesComics from '../../components/Layout/components/Comics/Comics.module.scss'
import stylesComic from '../../components/Layout/components/Comic/Comic.module.scss'
import DiaLog from '../../components/Layout/components/DiaLog'
import Context from '../../Context'

const cx = classNames.bind(styles)
const cxComics = classNames.bind(stylesComics)
const cxComic = classNames.bind(stylesComic)

function History() {
    const {
        setIsOpenDiaLog,
        isOpenDiaLog,
        setQuantityComicHistory } = useContext(Context)
    const [comics, setComics] = useState({})
    const [slugs, setSlugs] = useState([])

    useEffect(() => {
        const historyStorage = storage.get('history-storage', {})
        const slugs = Object.keys(historyStorage)
        setComics(historyStorage)
        setSlugs(slugs)
    }, [])

    const handleDeleteAll = () => {
        setSlugs([])
        setComics({})
        setQuantityComicHistory(0)
        storage.set('history-storage', {})
        toast.success('Xoá lịch sử thành công!')
    }

    return (
        <Fragment>
            <div style={{ margin: 'unset' }} className={cxComics('wrapper')}>
                <div className={cxComics('title')}>
                    <h4>
                        {slugs.length > 0 ?
                            `Lịch sử đã xem (${slugs.length})` :
                            'Lịch sử xem trống!'}
                    </h4>
                    {slugs.length > 0 &&
                        <button
                            className={cxComics('delete-all')}
                            onClick={() => setIsOpenDiaLog(true)}>Xoá tất cả</button>
                    }
                </div>
                {slugs.map(slug => (
                    <div key={slug} className={cx('wrapper')}>
                        <h4>{`${slug} (${comics[slug].length} chương đã xem)`}</h4>
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
                                            <h4>{`Chương ${comic?.data?.item?.chapter_name}`}</h4>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            {isOpenDiaLog &&
                <DiaLog
                    onDeleteAll={handleDeleteAll}
                    text={'Lịch sử hiện tại sẽ bị xoá vĩnh viễn!'}
                />
            }
        </Fragment>
    )
}

export default History;
import { useEffect, useState, useContext, Fragment } from "react"
import classNames from 'classnames/bind'
import toast from "react-hot-toast"

import storage from '../../utils'
import Comic from "../../components/Layout/components/Comic"
import styles from '../../components/Layout/components/Comics/Comics.module.scss'
import DiaLog from '../../components/Layout/components/DiaLog'
import Context from '../../Context'

const cx = classNames.bind(styles)

function Save() {
    const {
        setIsOpenDiaLog,
        isOpenDiaLog,
        setQuantityComic } = useContext(Context)
    const [comics, setComics] = useState([])

    useEffect(() => {
        const comicStorage = storage.get('comic-storage', [])
        setComics(comicStorage)
    }, [])

    const handleDeleteAll = () => {
        setComics([])
        setQuantityComic(0)
        storage.set('comic-storage', [])
        toast.success('Xoá tất cả thành công!')
    }

    return (
        <Fragment>
            <div style={{ margin: 'unset' }} className={cx('wrapper')}>
                <div className={cx('title')}>
                    <h4>
                        {comics.length > 0 ?
                            `Kho lưu trữ (${comics.length})` :
                            'Kho lưu trữ trống!'}
                    </h4>
                    {comics.length > 0 &&
                        <button
                            className={cx('delete-all')}
                            onClick={() => setIsOpenDiaLog(true)}>
                            Xoá tất cả
                        </button>
                    }
                </div>
                <div className={cx('list')}>
                    {comics.map((comic, index) => (
                        <Comic key={index} data={comic} />
                    ))}
                </div>
            </div>
            {isOpenDiaLog &&
                <DiaLog
                    onDeleteAll={handleDeleteAll}
                    text='Tất cả truyện trong kho lưu trữ sẽ bị xoá vĩnh viễn!'
                />
            }
        </Fragment>
    )
}

export default Save
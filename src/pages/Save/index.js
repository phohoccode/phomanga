import { useEffect, useState } from "react";
import storage from '../../utils'
import Comic from "../../components/Layout/components/Comic";

import classNames from 'classnames/bind'
import styles from '../../components/Layout/components/Comics/Comics.module.scss'
const cx = classNames.bind(styles)

function Save() {
    const [comics, setComics] = useState([])

    useEffect(() => {
        const comicStorage = storage.get('comic-storage', [])
        setComics(comicStorage)
    }, [])

    const handleDeleteAll = () => {
        setComics([])
        storage.set('comic-storage', [])
    }

    return (
        <div style={{ margin: 'unset' }} className={cx('wrapper')}>
            <div className={cx('title')}>
                <h4>
                    {comics.length > 0 ?
                        `Kho lưu trữ (${comics.length})` :
                        'Kho lưu trữ trống'}
                </h4>
                {comics.length > 0 &&
                    <button onClick={handleDeleteAll}>Xoá tất cả</button>
                }
            </div>
            <div className={cx('list')}>
                {comics.map((comic, index) => (
                    <Comic key={index} data={comic} />
                ))
                }
            </div>
        </div>
    );
}

export default Save;
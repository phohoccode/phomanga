
import classNames from 'classnames/bind'
import styles from './Comics.module.scss'
import useFetch from '../../../../hooks/useFetch'
import { useEffect, useState } from 'react'
import Comic from '../Comic'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function Comics({ api }) {
    const [data] = useFetch(api)
    const [comics, setComics] = useState([])

    useEffect(() => {
        console.log(data);
        setComics(data?.data?.items || [])
    }, [data])

    return (
        <div className={cx('wrapper')}>
            {data &&
                <div className={cx('title')}>
                    <h4>{data?.data?.titlePage}</h4>
                    <Link className={cx('see-more')} to={`/detail${data?.data?.breadCrumb[0]?.slug}`}>
                        Xem thêm
                    </Link>
                </div>
            }
            <div className={cx('list')}>
                {comics.map((comic, index) => (
                    <Comic key={index} data={comic} />
                ))}
            </div>
        </div>
    );
}

export default Comics;
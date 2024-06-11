import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import styles from './Comic.module.scss'

const cx = classNames.bind(styles)

function Comic({ data }) {
    return (
        <div className={cx('wrapper')}>
            <Link to={`/info/${data?.slug}`}>
                <figure>
                    <img 
                        src={`https://otruyenapi.com/uploads/comics/${data?.thumb_url}`} 
                        alt={data?.name}/>
                </figure>
                <div className={cx('info')}>
                    <h4>{data?.name}</h4>
                </div>
            </Link>
        </div>
    )
}

export default Comic
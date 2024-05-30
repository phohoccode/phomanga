import classNames from 'classnames/bind'
import styles from './Search.module.scss'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Comic from '../../components/Layout/components/Comic'
import stylesComics from '../../components/Layout/components/Comics/Comics.module.scss'

const cx = classNames.bind(styles)

function Search() {
    const params = useParams()
    const [data] = useFetch(`https://otruyenapi.com/v1/api/tim-kiem?keyword=${params.keyword}`)
    const [result, setResult] = useState([])

    useEffect(() => {
        setResult(data?.data?.items || [])
        console.log(data)
    }, [data])

    return (
        <div className={cx('wrapper')}>
            {data &&
                <h4>
                    {result.length > 0 ? 
                        `Tìm kiếm được ${data?.data?.params?.pagination?.totalItems} truyện phù hợp cho từ khoá ''${params.keyword}''` : 
                        `Không tìm kiếm được truyện phù hợp!`
                    }
                </h4>
            }
            <div className={cx('list')}>
                {result.map((comic, index) => (
                    <Comic key={index} data={comic} />
                ))}
            </div>
        </div>
    )
}

export default Search
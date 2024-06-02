
import classNames from 'classnames/bind'
import styles from './Detail.module.scss'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Comic from '../../components/Layout/components/Comic'
import { useEffect, useState } from 'react'
import Pagination from '../../components/Layout/components/Pagination'

const cx = classNames.bind(styles)

function Detail() {
    const params = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [data] = useFetch(
        `https://otruyenapi.com/v1/api/${params.describe}/${params.slug}?page=${currentPage}`)
    const [comics, setComics] = useState([])
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        if (data) {
            console.log(data);
            const totalItems =
                data?.data?.params?.pagination?.totalItems
            const totalItemsPerPage =
                data?.data?.params?.pagination?.totalItemsPerPage
            setComics(data?.data?.items || [])
            totalItems > totalItemsPerPage ?
                setTotalPage(Math.round(totalItems / totalItemsPerPage)) :
                setTotalPage(1)
        }
    }, [data])

    useEffect(() => {
        setCurrentPage(1)
    }, [params])


    return (
        <div className={cx('wrapper')}>
            {data &&
                <>
                    <div className={cx('title')}>
                        <h4>{data?.data?.breadCrumb[0]?.name}</h4>
                        <span>{data?.data?.breadCrumb[1]?.name}</span>
                    </div>
                    <div className={cx('list')}>
                        {comics.map((comic, index) => (
                            <Comic key={index} data={comic} />
                        ))
                        }
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPage={totalPage}
                        itemsPerPage={window.innerWidth > 786 ? 10 : 4}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            }
        </div>
    )
}

export default Detail
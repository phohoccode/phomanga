import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classNames from 'classnames/bind'

import styles from '../../components/Layout/components/Comics/Comics.module.scss'
import useFetch from '../../hooks/useFetch'
import Comic from '../../components/Layout/components/Comic'
import Pagination from '../../components/Layout/components/Pagination'
import { scrollToTop } from '../../utils'

const cx = classNames.bind(styles)

function Detail() {
    const params = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [data] = useFetch(
        `https://otruyenapi.com/v1/api/${params.describe}/${params.slug}?page=${currentPage}`)
    const [comics, setComics] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [width, setWidth] = useState(window.innerWidth)
    
    useEffect(() => {
        console.log('currenpage', currentPage);
        setCurrentPage(1)
    }, [params.slug])

    useEffect(() => {
        scrollToTop()
    }, [currentPage])

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (data) {
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

    return (
        <div style={{ margin: 'unset' }} className={cx('wrapper')}>
            {!data && <h4 className={cx('loading')}>Đang tải dữ liệu...</h4>}
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
                        itemsPerPage={width > 786 ? 10 : 4}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            }
        </div>

    )
}

export default Detail
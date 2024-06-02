import classNames from 'classnames/bind'
import styles from './Search.module.scss'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Comic from '../../components/Layout/components/Comic'
import Pagination from '../../components/Layout/components/Pagination'

const cx = classNames.bind(styles)

function Search() {
    const params = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [data] = useFetch(`https://otruyenapi.com/v1/api/tim-kiem?keyword=${params.keyword}&page=${currentPage}`)
    const [result, setResult] = useState([])
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        if (data) {
            const totalItems =
                data?.data?.params?.pagination?.totalItems
            const totalItemsPerPage =
                data?.data?.params?.pagination?.totalItemsPerPage
            setResult(data?.data?.items || [])
            totalItems > totalItemsPerPage ?
                setTotalPage(Math.round(totalItems / totalItemsPerPage)) :
                setTotalPage(1)
        }
    }, [data])

    return (
        <div className={cx('wrapper')}>
            {data &&
                <>
                    <h4>
                        {result.length > 0 ?
                            `Tìm kiếm được ${data?.data?.params?.pagination?.totalItems} truyện phù hợp cho từ khoá ''${params.keyword}''` :
                            `Không tìm kiếm được truyện phù hợp!`
                        }
                    </h4>
                    <div className={cx('list')}>
                        {result.map((comic, index) => (
                            <Comic key={index} data={comic} />
                        ))}
                    </div>
                </>
            }
            {result.length > 0 &&
                <Pagination
                    currentPage={currentPage}
                    totalPage={totalPage}
                    itemsPerPage={window.innerWidth > 786 ? 10 : 4}
                    setCurrentPage={setCurrentPage}
                />
            }
        </div>
    )
}

export default Search
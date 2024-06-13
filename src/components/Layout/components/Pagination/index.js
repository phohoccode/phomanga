import { useEffect, useRef, useState } from "react"
import classNames from 'classnames/bind'
import toast from 'react-hot-toast'

import styles from './Pagination.module.scss'
import { useParams } from "react-router-dom"
import { scrollToTop } from "../../../../utils"

const cx = classNames.bind(styles)

function Pagination({ currentPage, totalPage, itemsPerPage, setCurrentPage }) {
    const params = useParams()
    const [pageNumbers, setPageNumbers] = useState([])
    const start = useRef(0)
    const end = useRef(0)

    useEffect(() => {
        start.current = currentPage === 1 ? 1 : currentPage

        if (totalPage !== 1) {
            if (totalPage > itemsPerPage) {
                end.current = currentPage === 1 ?
                    itemsPerPage :
                    Math.min(currentPage + itemsPerPage - 1, totalPage)
            } else {
                end.current = currentPage === 1 ?
                    totalPage :
                    Math.min(currentPage + itemsPerPage - 1, totalPage)
            }
        } else {
            end.current = 1
        }

        const numbers = []
        for (let i = start.current; i <= end.current; i++) {
            numbers.push(i)
        }
        setPageNumbers(numbers)
        scrollToTop()
    }, [currentPage, totalPage, itemsPerPage])

    useEffect(() => {
        toast(`Bạn đang ở trang ${currentPage}`, { duration: 1000 })
    }, [currentPage])

    useEffect(() => {
        setCurrentPage(1)
    }, [params.slug])

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPage) {
            setCurrentPage(prev => prev + 1)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <button
                className={cx({ 'disabled': currentPage === 1 })}
                onClick={handlePrev}
            >
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <ul className={cx('pagination')}>
                {pageNumbers.map((page, index) => (
                    <li
                        className={cx({ 'active': page === currentPage })}
                        onClick={() => setCurrentPage(page)}
                        key={index}>{page}</li>
                ))}
            </ul>
            <button
                className={cx({ 'disabled': currentPage === totalPage })}
                onClick={handleNext}
            >
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    )
}

export default Pagination

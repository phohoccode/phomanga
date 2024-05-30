import { useEffect } from "react";
import classNames from 'classnames/bind'
import styles from './Pagination.module.scss'

const cx = classNames.bind(styles)

function Pagination({ currentPage, totalPage, itemsPerPage, setCurrentPage }) {

    let pageNumbers = []
    let start, end;

    useEffect(() => {
        console.log('totalpage', totalPage);
        console.log('pagenumber',pageNumbers);
        pageNumbers = []
        console.log(currentPage);
    }, [currentPage])
    // Tính toán start và end dựa trên currentPage
    if (currentPage === 1) {
        start = 1;
        end = itemsPerPage;
    } else {
        start = currentPage;
        end = currentPage + itemsPerPage - 1;
    }



    for (let i = start; i <= end && totalPage; i++) {
        pageNumbers.push(i)
    }
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
            <button onClick={handlePrev}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <ul className={cx('pagination')}>
                {pageNumbers.map((page, index) => (
                    <li
                        className={cx({'active': page === currentPage})}
                        onClick={() => setCurrentPage(page)}
                        key={index}>{page}</li>
                ))}
            </ul>
            <button onClick={handleNext}>
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    );
}

export default Pagination;
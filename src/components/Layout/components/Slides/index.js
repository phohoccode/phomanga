import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'

import styles from './Slides.module.scss'
import useFetch from '../../../../hooks/useFetch'
import Slide from '../Slide'

const cx = classNames.bind(styles)

function Slides({ api }) {
    const [data] = useFetch(api)
    const [slides, setSlides] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const slideInnerRef = useRef()
    const idInterval = useRef()
    const isGrabbing = useRef(false)
    const startPos = useRef(null)
    const currentTranslate = useRef(0)

    useEffect(() => {
        if (data) {
            setSlides(data?.data?.items || [])
        }
    }, [data])

    useEffect(() => {
        slideInnerRef.current.style.transform =
            `translateX(-${currentIndex * slideInnerRef.current.clientWidth}px)`
    }, [currentIndex])

    const startAutoSlides = () => {
        clearInterval(idInterval.current)
        idInterval.current = setInterval(handleNext, 6000)
    }

    useEffect(() => {
        startAutoSlides()
    }, [currentIndex])


    const stopAutoSlides = () => {
        clearInterval(idInterval.current)
    }

    const handlePrev = () => {
        setCurrentIndex(prevIndex =>
            (prevIndex === 0 ? slides.slice(0, 10).length - 1 : prevIndex - 1))
    }

    const handleNext = () => {
        setCurrentIndex(prevIndex =>
            (prevIndex === slides.slice(0, 10).length - 1 ? 0 : prevIndex + 1))
    }

    const getClientX = (event) => {
        return event.type.startsWith('touch') ?
            event.touches[0].clientX :
            event.clientX
    }

    const handleDragStart = (event) => {
        stopAutoSlides()
        if (event.type.startsWith('mouse')) {
            event.preventDefault()
        }
        const clientX = getClientX(event)
        startPos.current = clientX
        currentTranslate.current = 0
        isGrabbing.current = true
        slideInnerRef.current.style.transition = 'unset'
    }

    const handleDragMove = (event) => {
        if (isGrabbing.current) {
            const clientX = getClientX(event)
            currentTranslate.current = clientX - startPos.current
            slideInnerRef.current.style.transform =
                `translateX(${currentTranslate.current -
                (currentIndex * slideInnerRef.current.clientWidth)}px)`
        }
    }

    const handleDragEnd = () => {
        if (Math.abs(currentTranslate.current) > slideInnerRef.current.clientWidth / 3) {
            currentTranslate.current > 0 ? handlePrev() : handleNext()
        } else {
            slideInnerRef.current.style.transform =
                `translateX(-${currentIndex * slideInnerRef.current.clientWidth}px)`
        }
        isGrabbing.current = false
        startPos.current = null
        currentTranslate.current = 0
        slideInnerRef.current.style.transition = 'all .8s ease 0s'
        startAutoSlides()
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-inner')}>
                <div
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseLeave={handleDragEnd}
                    onMouseUp={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                    ref={slideInnerRef}
                    className={cx('inner')}
                >
                    {slides.slice(0, 10).map((slide, index) => (
                        <Slide
                            key={index}
                            data={slide}
                        />
                    ))}
                </div>
                {data &&
                    <div className={cx('actions')}>
                        <button onClick={handlePrev} className={cx('left')}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <button onClick={handleNext} className={cx('right')}>
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>}
            </div>
            <ul className={cx('slick-dots')}>
                {slides.slice(0, 10).map((_, index) => (
                    <li
                        onClick={() => setCurrentIndex(index)}
                        className={cx({ 'active': index === currentIndex })}
                        key={index}
                    ></li>
                ))}
            </ul>
        </div>
    )
}

export default Slides
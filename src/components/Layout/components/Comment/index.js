import classNames from 'classnames/bind'
import { useEffect, useRef, useState, useContext, Fragment } from 'react'
import toast from 'react-hot-toast'

import styles from './Comment.module.scss'
import storage, {
    isUrlWithValidDomainSuffix,
    formatTime,
    handleSelectedFocus
} from '../../../../utils'
import Context from '../../../../Context'
import DiaLog from '../DiaLog'
import avartar from './avartar.png'

const cx = classNames.bind(styles)

function Comment({ setIsShowMessage, slug, id }) {
    const { setIsOpenDiaLog, isOpenDiaLog } = useContext(Context)
    const [valueComment, setValueComment] = useState('')
    const [valueEditComment, setValueEditComment] = useState('')
    const [comments, setComments] = useState(() => {
        const commentStorage = storage.get('comments', {})
        return commentStorage?.[slug]?.[id] || []
    })
    const [indexDelete, setIndexDelete] = useState(-1)
    const [indexEdit, setIndexEdit] = useState(-1)
    const wrapperRef = useRef()
    const modalRef = useRef()
    const commentEditRef = useRef()

    useEffect(() => {
        handleSelectedFocus(commentEditRef.current)
    }, [indexEdit])

    const handleCloseModal = () => {
        if (modalRef.current && wrapperRef.current) {
            document.body.style.overflowY = 'auto'
            modalRef.current.classList.add(cx('slideOut'))
            wrapperRef.current.classList.add(cx('fadeOut'))
            setTimeout(() => {
                setIsShowMessage(false)
            }, 400)
        }
    }

    const handleWrapperClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal()
        }
    }

    const handleAddComment = () => {
        if (valueComment !== '') {
            const commentStorage = storage.get('comments', {})
            const newComment = {
                value: valueComment,
                time: new Date()
            }
            if (!commentStorage[slug]) {
                commentStorage[slug] = {}
            }
            if (!commentStorage[slug][id]) {
                commentStorage[slug][id] = []
            }
            commentStorage[slug][id] = [...commentStorage[slug][id], newComment]
            storage.set('comments', commentStorage)
            setComments(commentStorage[slug][id] || [])
            setValueComment('')
            toast.success('Thêm bình luận thành công!')
        }
    }

    const handleDeleteComment = () => {
        const commentStorage = storage.get('comments', {})
        commentStorage[slug][id].splice(indexDelete, 1)
        storage.set('comments', commentStorage)
        setComments(commentStorage[slug][id])
        setIndexDelete(-1)
        toast.success('Xoá bình luận thành công')
    }

    const handleEditComment = (index) => {
        setIndexEdit(index)
        setValueEditComment(comments[index].value)
    }

    const handleSaveEditComment = () => {
        const commentStorage = storage.get('comments', {})
        commentStorage[slug][id][indexEdit].value = valueEditComment
        storage.set('comments', commentStorage)
        setComments(commentStorage[slug][id])
        setIndexEdit(-1)
        toast.success('Sửa bình luận thành công')
    }

    const handleOpenDiaLog = (index) => {
        setIndexDelete(index)
        setIsOpenDiaLog(true)
    }

    return (
        <Fragment>
            <div
                ref={wrapperRef}
                className={cx('wrapper')}
                onClick={handleWrapperClick}
            >
                <div ref={modalRef} className={cx('modal')}>
                    <button
                        onClick={handleCloseModal}
                        className={cx('close')}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className={cx('body')}>
                        <div className={cx('title')}>
                            <h4>{comments.length} bình luận</h4>
                            <p>Không bình luận tiêu cực, hãy là độc giả văn minh!</p>
                        </div>
                        <div className={cx('box')}>
                            <textarea
                                value={valueComment}
                                onChange={e => setValueComment(e.target.value)}
                                placeholder='Nhập nội dung bình luận...'>
                            </textarea>
                            <button
                                className={cx('ok', { 'disabled': valueComment === '' })}
                                onClick={handleAddComment}>Bình luận</button>
                        </div>
                        <ul className={cx('list')}>
                            {comments.map((comment, index) => (
                                <li className={cx('item')} key={index}>
                                    <figure>
                                        <img src={avartar} alt='avartar' />
                                    </figure>
                                    <div className={cx('item-body')}>
                                        <div className={cx('item-content')}>
                                            {index !== indexEdit &&
                                                <Fragment>
                                                    <h5>Độc giả</h5>
                                                    {<p>
                                                        {comment?.value.split(' ').map((cmt, index) => (
                                                            <Fragment key={index}>{
                                                                !isUrlWithValidDomainSuffix(cmt) ? ` ${cmt} ` : (
                                                                    <a
                                                                        href={cmt}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        {cmt}
                                                                    </a>
                                                                )
                                                            }</Fragment>
                                                        ))}
                                                    </p>}
                                                </Fragment>
                                            }
                                            {index === indexEdit &&
                                                <textarea
                                                    ref={commentEditRef}
                                                    style={{ margin: 'unset' }}
                                                    value={valueEditComment}
                                                    onChange={e => setValueEditComment(e.target.value)}>
                                                </textarea>
                                            }
                                        </div>
                                        <div className={cx('seperate')}></div>
                                        <div className={cx('item-actions')}>
                                            {index !== indexEdit &&
                                                <Fragment>
                                                    <span
                                                        onClick={() => handleOpenDiaLog(index)}
                                                        className={cx('delete')}>Xoá</span>
                                                    <span> · </span>
                                                    <span
                                                        onClick={() => handleEditComment(index)}
                                                        className={cx('edit')}>Chỉnh sửa</span>
                                                    <span> · </span>
                                                </Fragment>
                                            }
                                            {index === indexEdit &&
                                                <Fragment>
                                                    <span
                                                        onClick={() => setIndexEdit(-1)}
                                                        className={cx('cancel')}>Huỷ</span>
                                                    <span> · </span>
                                                    <span
                                                        onClick={handleSaveEditComment}
                                                        className={cx('save')}>Lưu</span>
                                                    <span> · </span>
                                                </Fragment>
                                            }
                                            <span className={cx('time')}>
                                                {formatTime(comment?.time)}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {isOpenDiaLog &&
                <DiaLog
                    onDeleteComment={handleDeleteComment}
                    text='Bạn chắc chắn muốn xoá bình luận này?'
                />
            }
        </Fragment>
    )
}

export default Comment
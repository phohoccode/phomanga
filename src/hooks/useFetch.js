import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function useFetch(url) {
    const navigate = useNavigate()
    const [data, setData] = useState(null)

    const handleFetchToError = () => {
        navigate('/notfound')
        toast.error('Đã xảy ra lỗi khi lấy dữ liệu!')
    }

    useEffect(() => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then(data => {
                if (data?.status === 'error') {
                    handleFetchToError()
                    return
                }
                setData(data)
            })
            .catch(error => {
                console.error(error)
                handleFetchToError()
            })
    }, [url])

    return [data]
}

export default useFetch

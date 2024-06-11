import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

function useFetch(url) {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then(data => setData(data))
            .catch(error => {
                console.error(error)
                toast.error('Đã xảy ra lỗi khi lấy dữ liệu!')
            })
    }, [url])

    return [data]
}

export default useFetch

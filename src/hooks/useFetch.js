import { useState, useEffect } from 'react'

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
            })
    }, [url])

    return [data]
}

export default useFetch

import { useEffect, useState } from "react"
import Context from "./Context"
import storage from './utils'
import toast from "react-hot-toast"

function Provider({ children }) {
    const [isOpenDiaLog, setIsOpenDiaLog] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [theme, setTheme] = useState(() => {
        return storage.get('theme', 'light')
    })

    const value = {
        setIsOpenDiaLog,
        isOpenDiaLog,
        theme,
        setTheme,
        width
    }

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        storage.set('theme', theme)
        toast(`Chủ đề ${theme === 'light' ? 'sáng' : 'tối'}`, { duration: 1000 })
    }, [theme])

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default Provider
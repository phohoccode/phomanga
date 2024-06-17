import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DefaultLayout from './components/Layout/DefaultLayout'
import publicRoutes from './routers'
import BreadCrumb from './components/Layout/components/BreadCrumb'
import { useContext } from 'react'
import Context from './Context'

function App() {
    const { width } = useContext(Context)

    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <DefaultLayout>
                                    {width <= 1023 && <BreadCrumb />}
                                    <Page />
                                </DefaultLayout>
                            }
                        />
                    )
                })}
            </Routes>
        </Router>
    )
}

export default App;

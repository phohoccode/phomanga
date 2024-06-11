import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import DefaultLayout from './components/Layout/DefaultLayout'
import publicRoutes from './routers'

function App() {

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

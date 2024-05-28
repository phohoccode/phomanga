import Home from "../pages/Home"
import Detail from "../pages/Detail"
import Info from "../pages/Info"
import Watch from "../pages/Watch"
import Search from "../pages/Search"
import History from "../pages/History"
import Save from "../pages/Save"
import NotFound from "../pages/NotFound"

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/detail/:describe/:slug', component: Detail},
    { path: '/info/:slug', component: Info },
    { path: '/save', component: Save },
    { path: '/history', component: History },
    { path: '/search/:keyword', component: Search },
    { path: '/watch/:slug', component: Watch },
    { path: '*', component: NotFound },
]

export default publicRoutes
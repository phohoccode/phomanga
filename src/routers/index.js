import Home from "../pages/Home"
import Detail from "../pages/Detail"
import Info from "../pages/Info"
import Read from "../pages/Read"
import Search from "../pages/Search"
import History from "../pages/History"
import Save from "../pages/Save"
import NotFound from "../pages/NotFound"

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/detail/:describe/:slug', component: Detail },
    { path: '/info/:slug', component: Info },
    { path: '/save', component: Save },
    { path: '/history', component: History },
    { path: '/search/:keyword', component: Search },
    { path: '/read/:slug/:id', component: Read },
    { path: '/notfound', component: NotFound },
    { path: '*', component: NotFound },
]

export default publicRoutes
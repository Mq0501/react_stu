import { createBrowserRouter } from 'react-router'
import Login from '../page/Login'
import Article from '../page/Article'

const router = createBrowserRouter([
    {
        path: '/login/:id',
        element: <Login />
    },
    {
        path: '/article',
        element: <Article />
    }
])

export default router
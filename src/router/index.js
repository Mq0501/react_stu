// 路由配置
import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
// import About from "@/pages/About";
// import Board from "@/pages/Board";

// 1. lazy函数对组件进行导入
const About = lazy(() => import('@/pages/About'));
const Board = lazy(() => import('@/pages/Board'));

// 配置路由
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/about',
                element: <Suspense fallback={<div>Loading...</div>}><About /></Suspense>
            },
            {
                path: '/board',
                element: <Suspense fallback={<div>Loading...</div>}><Board /></Suspense>
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    }
])

export default router;
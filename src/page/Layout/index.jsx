import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <div>
      我是一级路由
      <Link to="/">面板</Link>
      <Link to="/about">关于</Link>
      {/* 配置二级路由出口 */}
      <Outlet />
    </div>
  );
}

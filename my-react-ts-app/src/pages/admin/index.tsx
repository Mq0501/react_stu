import { Layout } from "antd";
import Sidebar from "@/layouts/admin/Sidebar";
import Header from "@/layouts/admin/Header";
import Content from "@/layouts/admin/Content";
import "./index.scss";

function Backstage() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 侧边栏 */}
      <Sidebar />
      {/* 主体内容区域 */}
      <Layout>
        {/* 顶部导航栏 */}
        <Header />
        {/* 主要内容区域 */}
        <Content />
      </Layout>
    </Layout>
  );
}

export default Backstage;

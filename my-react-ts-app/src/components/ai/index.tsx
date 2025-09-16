import React from "react";
import { Layout } from "antd";
import AiSider from "./AiSider";
import Header from "./Header";
import "./index.scss";
import AiContent from "./AiContent";

const { Content } = Layout;

const ClaudeLikeInterface: React.FC = () => {
  return (
    <Layout style={{ height: "100vh", background: "#fff" }}>
      {/* 左侧边栏 */}
      <AiSider />
      {/* 主内容区 */}
      <Layout>
        {/* 顶部导航 */}
        <Header />
        {/* 主要内容 */}
        <Content className="ai-content">
          {/* 中央内容区域 */}
          <AiContent />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ClaudeLikeInterface;

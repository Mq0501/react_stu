import React from "react";
import { Layout } from "antd";
import ChatSidebar from "../ChatSidebar";
import ChatMain from "../ChatMain";

const { Header, Content: AntContent, Footer, Sider } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ChatSidebar />
      <Layout>
        <AntContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ChatMain username="多多米" />
        </AntContent>
      </Layout>
    </Layout>
  );
};

export default App;

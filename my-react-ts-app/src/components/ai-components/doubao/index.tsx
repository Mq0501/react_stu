import React, { useState } from "react";
import {
  Layout,
  Menu,
  Input,
  Button,
  Space,
  Typography,
  Card,
  Badge,
  Avatar,
  Tooltip,
  Dropdown,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  CodeOutlined,
  PictureOutlined,
  BookOutlined,
  ExperimentOutlined,
  MoreOutlined,
  SendOutlined,
  PaperClipOutlined,
  AudioOutlined,
  BellOutlined,
  MessageOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

interface ChatHistory {
  id: string;
  title: string;
  preview: string;
}

const ClaudeLikeInterface: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory] = useState<ChatHistory[]>([
    {
      id: "1",
      title: "关于历史对话的讨论",
      preview: "探讨了历史事件的影响和意义",
    },
    { id: "2", title: "关于历史对话的询问", preview: "询问了具体的历史问题" },
    { id: "3", title: "关于历史对话的探讨", preview: "深入分析了历史发展脉络" },
    { id: "4", title: "图片处理", preview: "处理和分析图片内容" },
  ]);

  const quickActions = [
    { icon: <PictureOutlined />, label: "图像生成", color: "#ff7a45" },
    { icon: <CodeOutlined />, label: "AI 编程", color: "#52c41a" },
    { icon: <EditOutlined />, label: "帮我写作", color: "#1890ff" },
    { icon: <SearchOutlined />, label: "AI 搜索", color: "#722ed1" },
    { icon: <BookOutlined />, label: "AI 阅读", color: "#eb2f96" },
    { icon: <ExperimentOutlined />, label: "学术搜索", color: "#13c2c2" },
    { icon: <MoreOutlined />, label: "更多", color: "#8c8c8c" },
  ];

  const userMenuItems = [
    { key: "1", label: "个人设置" },
    { key: "2", label: "使用帮助" },
    { key: "3", label: "退出登录" },
  ];

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      console.log("发送消息:", inputValue);
      setInputValue("");
    }
  };

  return (
    <Layout style={{ height: "100vh", background: "#fff" }}>
      {/* 左侧边栏 */}
      <Sider
        width={280}
        collapsed={collapsed}
        collapsible={false}
        style={{
          background: "#fafafa",
          borderRight: "1px solid #f0f0f0",
          padding: "16px 0",
        }}
      >
        <div style={{ padding: "0 16px", marginBottom: "16px" }}>
          <Button
            type="primary"
            block
            icon={<PlusOutlined />}
            size="large"
            style={{ borderRadius: "6px", height: "40px" }}
          >
            新对话
          </Button>
        </div>

        <Menu
          mode="inline"
          style={{
            background: "transparent",
            border: "none",
            fontSize: "14px",
          }}
          items={[
            {
              key: "search",
              icon: <SearchOutlined />,
              label: "AI 搜索",
            },
            {
              key: "write",
              icon: <EditOutlined />,
              label: "帮我写作",
            },
            {
              key: "code",
              icon: <CodeOutlined />,
              label: "AI 编程",
            },
            {
              key: "image",
              icon: <PictureOutlined />,
              label: "图像生成",
            },
            {
              key: "more",
              icon: <MoreOutlined />,
              label: "更多",
            },
          ]}
        />

        <div style={{ padding: "0 16px", marginTop: "24px" }}>
          <Text type="secondary" style={{ fontSize: "12px", fontWeight: 500 }}>
            历史对话
          </Text>
          <div style={{ marginTop: "12px" }}>
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginBottom: "4px",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0f0f0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "2px",
                  }}
                >
                  <MessageOutlined
                    style={{ fontSize: "12px", color: "#8c8c8c" }}
                  />
                  <Text
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      flex: 1,
                    }}
                  >
                    {chat.title}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 底部用户信息 */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "16px",
            right: "16px",
            padding: "12px",
            background: "#fff",
            borderRadius: "8px",
            border: "1px solid #f0f0f0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <HistoryOutlined style={{ fontSize: "16px", color: "#8c8c8c" }} />
            <Text style={{ fontSize: "13px" }}>下载电脑版</Text>
          </div>
        </div>
      </Sider>

      {/* 主内容区 */}
      <Layout>
        {/* 顶部导航 */}
        <div
          style={{
            height: "64px",
            background: "#fff",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
              下午好，多多米
            </Title>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Tooltip title="通知">
              <Badge count={0} size="small">
                <BellOutlined style={{ fontSize: "18px", color: "#8c8c8c" }} />
              </Badge>
            </Tooltip>

            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  padding: "4px 8px",
                  borderRadius: "6px",
                }}
              >
                <Avatar size={32} style={{ backgroundColor: "#1890ff" }}>
                  多
                </Avatar>
              </div>
            </Dropdown>
          </div>
        </div>

        {/* 主要内容 */}
        <Content
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 64px)",
          }}
        >
          {/* 中央内容区域 */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              maxWidth: "800px",
              margin: "0 auto",
              width: "100%",
            }}
          >
            {/* 快捷功能按钮 */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                marginBottom: "32px",
                flexWrap: "wrap",
              }}
            >
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  size="large"
                  style={{
                    height: "48px",
                    borderRadius: "24px",
                    border: "1px solid #f0f0f0",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "0 20px",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                  }}
                  icon={React.cloneElement(action.icon, {
                    style: { color: action.color },
                  })}
                >
                  {action.label}
                </Button>
              ))}
            </div>

            {/* 输入区域 */}
            <div style={{ marginTop: "auto" }}>
              <Card
                style={{
                  borderRadius: "12px",
                  border: "1px solid #d9d9d9",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                }}
                bodyStyle={{ padding: "16px" }}
              >
                <TextArea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="发消息... 输入 @ 选择技能或 / 选择文件"
                  autoSize={{ minRows: 1, maxRows: 6 }}
                  bordered={false}
                  style={{
                    fontSize: "15px",
                    resize: "none",
                  }}
                  onPressEnter={(e) => {
                    if (e.shiftKey) return;
                    e.preventDefault();
                    handleSendMessage();
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "12px",
                  }}
                >
                  <Space>
                    <Tooltip title="附件">
                      <Button
                        type="text"
                        icon={<PaperClipOutlined />}
                        size="small"
                      />
                    </Tooltip>
                    <Tooltip title="深度思考">
                      <Button
                        type="text"
                        size="small"
                        style={{ fontSize: "12px" }}
                      >
                        🧠 深度思考
                      </Button>
                    </Tooltip>
                    <Tooltip title="技能">
                      <Button
                        type="text"
                        size="small"
                        style={{ color: "#1890ff" }}
                      >
                        技能
                      </Button>
                    </Tooltip>
                  </Space>

                  <Space>
                    <Tooltip title="语音输入">
                      <Button
                        type="text"
                        icon={<AudioOutlined />}
                        size="small"
                        style={{ color: "#8c8c8c" }}
                      />
                    </Tooltip>
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      size="small"
                      style={{ borderRadius: "6px" }}
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                    />
                  </Space>
                </div>
              </Card>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ClaudeLikeInterface;

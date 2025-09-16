import React from "react";
import { Menu, Layout, Button } from "antd";
import type { SidebarMenuItem } from "../types";
import { PlusOutlined, FolderOutlined, DownOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const menuItems: SidebarMenuItem[] = [
  {
    key: "new-chat",
    label: "新对话",
    icon: <PlusOutlined />,
  },
  {
    key: "ai-search",
    label: "AI 搜索",
    icon: <FolderOutlined />,
  },
  {
    key: "write",
    label: "帮我写作",
    icon: <FolderOutlined />,
  },
  {
    key: "ai-code",
    label: "AI 编程",
    icon: <FolderOutlined />,
  },
  {
    key: "image-gen",
    label: "图像生成",
    icon: <FolderOutlined />,
  },
  {
    key: "more",
    label: "更多",
    icon: <DownOutlined />,
    children: [
      {
        key: "sub1",
        label: "子菜单项1",
      },
    ],
  },
  {
    key: "ai-disk",
    label: "AI 云盘",
    icon: <FolderOutlined />,
  },
  {
    key: "history",
    label: "历史对话",
    icon: <FolderOutlined />,
    children: [
      { key: "history-1", label: "关于历史对话的讨论" },
      { key: "history-2", label: "关于历史对话的询问" },
      { key: "history-3", label: "关于历史对话的探讨" },
      { key: "history-4", label: "图片处理" },
    ],
  },
];

const ChatSidebar: React.FC = () => {
  return (
    <Sider width={200} theme="light">
      <div style={{ padding: "16px", textAlign: "center" }}>
        <Button type="link">下载电脑版</Button>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["new-chat"]}
        items={menuItems.map((item) => ({
          key: item.key,
          label: item.label,
          icon: item.icon,
          children: item.children?.map((subItem) => ({
            key: subItem.key,
            label: subItem.label,
          })),
        }))}
      />
    </Sider>
  );
};

export default ChatSidebar;

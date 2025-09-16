import {
  Layout,
  Menu,
  Button,
  Input,
  Space,
  Dropdown,
  Avatar,
  Badge,
} from "antd";
import {
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
  SettingOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { useState } from "react";

import "./index.scss"; // 引入样式

const { Header } = Layout;

function LayoutBar() {
  const [collapsed, setCollapsed] = useState(false);

  // 用户菜单
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        个人资料
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  );

  return (
    <Header className="admin-header">
      <div className="header-btn">
        <Button
          type="text"
          className="menu-toggle"
          icon={<MenuOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
        <Input
          placeholder="搜索..."
          prefix={<SearchOutlined />}
          className="search-input"
          style={{ width: 300, marginLeft: 16 }}
        />
      </div>

      <Space size="large">
        <Badge count={5}>
          <Button type="text" className="menu-toggle" icon={<BellOutlined />} />
        </Badge>
        <Dropdown overlay={userMenu} placement="bottomRight">
          <Space className="user-menu">
            <Avatar src="public/logo/logo.png" />
            <span>管理员</span>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
}

export default LayoutBar;

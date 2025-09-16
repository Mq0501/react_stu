import { Typography, Badge, Avatar, Tooltip, Dropdown } from "antd";
import { BellOutlined } from "@ant-design/icons";

import "./index.scss";

const { Title } = Typography;

function Header() {
  const userMenuItems = [
    { key: "1", label: "个人设置" },
    { key: "2", label: "使用帮助" },
    { key: "3", label: "退出登录" },
  ];

  return (
    <div className="ai-header">
      <div className="header-tit">
        <Title level={4} className="title-text">
          下午好，多多米
        </Title>
      </div>

      <div className="header-inform">
        <Tooltip title="通知">
          <Badge count={0} size="small">
            <BellOutlined className="inform-icon" />
          </Badge>
        </Tooltip>

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <div className="user-avatar">
            <Avatar size={32} className="user-avatar-icon">
              多
            </Avatar>
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;

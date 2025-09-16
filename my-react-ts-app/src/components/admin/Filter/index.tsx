import { Button, Input, Select, Dropdown, Menu, Row, Col } from "antd";
import { SearchOutlined, MoreOutlined } from "@ant-design/icons";
import { useState } from "react";

import "./index.scss";
function Filter() {
  const [searchText, setSearchText] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [pageSize, setPageSize] = useState(10);

  // 更多操作菜单
  const moreMenu = (
    <Menu>
      <Menu.Item key="export">导出数据</Menu.Item>
      <Menu.Item key="import">导入数据</Menu.Item>
      <Menu.Item key="settings">列设置</Menu.Item>
    </Menu>
  );

  return (
    <Row className="content-filter" gutter={16}>
      <Col span={4}>
        <Select
          className="content-select"
          placeholder="page 10"
          value={pageSize}
          onChange={setPageSize}
        >
          <option value={10}>page 10</option>
          <option value={25}>page 25</option>
          <option value={50}>page 50</option>
        </Select>
      </Col>
      <Col span={5}>
        <Input
          placeholder="寻找..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Col>
      <Col span={4}>
        <Select
          placeholder="地点"
          className="content-select"
          onChange={setLocationFilter}
        >
          <option value="">全部地点</option>
          <option value="加州">加州</option>
          <option value="凤凰">凤凰</option>
          <option value="跨境部定期州">跨境部定期州</option>
        </Select>
      </Col>
      <Col span={4}>
        <Select
          placeholder="选择类型"
          className="content-select"
          onChange={setStatusFilter}
        >
          <option value="">全部类型</option>
          <option value="active">全职</option>
          <option value="inactive">兼职</option>
          <option value="pending">待定</option>
        </Select>
      </Col>
      <Col span={4}>
        <Select
          placeholder="选择时间"
          className="content-select"
          onChange={setTimeFilter}
        >
          <option value="">全部时间</option>
          <option value="today">今天</option>
          <option value="week">本周</option>
          <option value="month">本月</option>
        </Select>
      </Col>
      <Col span={3}>
        <Dropdown overlay={moreMenu} placement="bottomRight">
          <Button icon={<MoreOutlined />}>更多</Button>
        </Dropdown>
      </Col>
    </Row>
  );
}

export default Filter;

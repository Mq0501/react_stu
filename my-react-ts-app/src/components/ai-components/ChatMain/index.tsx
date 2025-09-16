import React, { useState } from 'react';
import type { GreetingProps, ChatInputAreaProps } from "../types";
import { Layout, Input, Button, Tag } from 'antd';
import { SendOutlined, AudioOutlined, ScissorOutlined } from '@ant-design/icons';

const { Content } = Layout;

const ChatMain: React.FC<GreetingProps & ChatInputAreaProps> = ({ username }) => {
  const [inputValue, setInputValue] = useState('');
  const handleSend = () => {
    if (inputValue.trim()) {
      // 可调用实际发送逻辑，比如和 ChatUI 交互
      console.log('发送内容:', inputValue);
      setInputValue('');
    }
  };
  return (
    <Content style={{ padding: '24px', flex: 1 }}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>下午好，{username}</h1>
      <Input.TextArea
        placeholder="发消息、输入 @ 选择技能或 / 选择文件"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ marginBottom: '8px' }}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button type="default">深度思考</Button>
          <Button icon={<ScissorOutlined />} type="text" />
          <Button icon={<AudioOutlined />} type="text" />
        </div>
        <Button icon={<SendOutlined />} type="primary" onClick={handleSend}>
          发送
        </Button>
      </div>
      <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <Tag>图像生成</Tag>
        <Tag>AI 编程</Tag>
        <Tag>帮我写作</Tag>
        <Tag>AI 搜索</Tag>
        <Tag>AI 阅读</Tag>
        <Tag>学术搜索</Tag>
        <Tag>更多</Tag>
      </div>
    </Content>
  );
};

export default ChatMain;
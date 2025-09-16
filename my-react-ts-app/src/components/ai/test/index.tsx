import React, { useState, useRef, useEffect } from "react";
import { Layout } from "antd";

import "./index.scss";

const { Content } = Layout;

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ChatConversationPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "user",
      content: "我有一个问题",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "assistant",
      content:
        "请你把具体的问题描述出来吧～ 无论是知识咨询、问题解答、创意创作还是其他需求，你说得越详细，我就越能准确地帮到你哦！",
      timestamp: new Date(),
    },
    {
      id: "3",
      type: "user",
      content: "你猜我想问什么",
      timestamp: new Date(),
    },
    {
      id: "4",
      type: "assistant",
      content:
        "哈哈，这可有点难猜呢！不过我可以根据常见的问题方向给你一些推测，看看有没有接近的～ 你可能想问：\n\n• 某个知识类问题（比如历史事件、科学原理、生活常识）？\n\n• 学习或工作上的难题（比如作业解答、技能技巧、学习方法）？\n\n• 创意相关的需求（比如文案写作、故事构思、灵感启发）？",
      timestamp: new Date(),
    },
  ]);

  //   const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  //   const handleSendMessage = () => {
  //     if (inputValue.trim()) {
  //       const newMessage: Message = {
  //         id: Date.now().toString(),
  //         type: "user",
  //         content: inputValue,
  //         timestamp: new Date(),
  //       };

  //       setMessages((prev) => [...prev, newMessage]);
  //       setInputValue("");

  //       // 模拟AI回复
  //       setTimeout(() => {
  //         const aiResponse: Message = {
  //           id: (Date.now() + 1).toString(),
  //           type: "assistant",
  //           content: "感谢您的问题！我正在为您思考最佳的回答。请稍等片刻...",
  //           timestamp: new Date(),
  //         };
  //         setMessages((prev) => [...prev, aiResponse]);
  //       }, 1000);
  //     }
  //   };

  const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.type === "user";

    return (
      <div
        className="message-box"
        style={{
          justifyContent: isUser ? "flex-end" : "flex-start",
        }}
      >
        {/* {!isUser && (
          <Avatar
            size={32}
            style={{
              backgroundColor: "#f56a00",
              flexShrink: 0,
              marginTop: "4px",
            }}
            icon={<RobotOutlined />}
          />
        )} */}

        <div className="message-bubble">
          <div
            className="message-text"
            style={{
              background: isUser ? "#448ef7" : "#fff",
              color: isUser ? "#fff" : "#333",
              borderRadius: isUser ? "18px 18px 4px 18px" : "",
              padding: isUser ? "12px 16px" : "10px 0",
            }}
          >
            {message.content.split("\n").map((line, index) => (
              <div key={index}>
                {line}
                {index < message.content.split("\n").length - 1 && <br />}
              </div>
            ))}
          </div>

          <div
            className="message-timestamp"
            style={{
              textAlign: isUser ? "right" : "left",
            }}
          >
            {message.timestamp.toLocaleTimeString("zh-CN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        {/* {isUser && (
          <Avatar
            size={32}
            style={{
              backgroundColor: "#1890ff",
              flexShrink: 0,
              marginTop: "4px",
            }}
            icon={<UserOutlined />}
          />
        )} */}
      </div>
    );
  };

  return (
    <Layout className="dialogue-box">
      <Content className="dialogue-content">
        {/* 消息列表区域 */}
        <div className="dialogue-messages">
          <div className="messages-container">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ChatConversationPage;

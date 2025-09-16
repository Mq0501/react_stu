import React, { useState } from "react";
import { Layout, Tabs, Button, Space, message } from "antd";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { ProFormTextArea } from "@ant-design/pro-components";
// import MDEditor from '@uiw/react-md-editor';
const { Content } = Layout;
const { TabPane } = Tabs;

// 编辑器组件属性接口
interface EditorProps {
  defaultMdValue?: string;
  defaultRichValue?: string;
  onSave?: (md: string, rich: string) => void;
}

const MarkdownAndRichTextEditor: React.FC<EditorProps> = ({
  defaultMdValue = "",
  defaultRichValue = "",
  onSave,
}) => {
  const [mdValue, setMdValue] = useState(defaultMdValue);
  const [richTextValue, setRichTextValue] = useState(defaultRichValue);

  const handleMdChange = (value: string | undefined) => {
    if (value !== undefined) {
      setMdValue(value);
    }
  };

  const handleRichTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRichTextValue(e.target.value);
  };

  const handleSave = () => {
    try {
      if (onSave) {
        onSave(mdValue, richTextValue);
      } else {
        console.log("Markdown内容:", mdValue);
        console.log("富文本HTML内容:", richTextValue);
      }
      message.success("内容保存成功");
    } catch (error) {
      message.error("保存失败，请重试");
      console.error("保存错误:", error);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          padding: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Tabs
          defaultActiveKey="markdown"
          style={{ marginBottom: "24px" }}
          size="large"
        >
          <TabPane tab="Markdown编辑器" key="markdown">
            <div
              style={{
                border: "1px solid #e8e8e8",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <MDEditor
                // className="bg-color-white"
                value={mdValue}
                onChange={handleMdChange}
                height={500}
                preview="edit"
                style={{backgroundColor: "#fff"}}
                commands={[
                  commands.bold,
                  commands.italic,
                  commands.strikethrough,
                  commands.hr,
                  commands.title,
                  commands.divider,
                  commands.link,
                  commands.quote,
                  commands.code,
                  commands.image,
                  commands.unorderedListCommand,
                  commands.orderedListCommand,
                  commands.checkedListCommand,
                ]}
              />
            </div>
          </TabPane>

          <TabPane tab="富文本编辑器" key="rich-text">
            <div
              style={{
                border: "1px solid #e8e8e8",
                borderRadius: "4px",
                padding: "8px",
              }}
            >
              <ProFormTextArea
                value={richTextValue}
                onChange={handleRichTextChange}
                fieldProps={{
                  style: { height: 500 },
                  placeholder: "请输入内容...",
                }}
              />
            </div>
          </TabPane>
        </Tabs>

        <Space>
          <Button type="primary" onClick={handleSave} size="middle">
            保存内容
          </Button>
          <Button
            onClick={() => {
              setMdValue("");
              setRichTextValue("");
            }}
            size="middle"
          >
            清空内容
          </Button>
        </Space>
      </Content>
    </Layout>
  );
};

export default MarkdownAndRichTextEditor;

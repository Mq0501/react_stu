import React, { useState, useRef, useCallback } from "react";
import {
  Button,
  Tooltip,
  Space,
  Layout,
  Typography,
  message,
  Row,
  Col,
} from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  LinkOutlined,
  CodeOutlined,
  TableOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  EyeOutlined,
  DownloadOutlined,
  SaveOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;
const { Text } = Typography;

// Markdown工具函数
const insertText = (
  textarea: HTMLTextAreaElement,
  insertValue: string,
  selectionStart?: number,
  selectionEnd?: number
) => {
  const startPos = selectionStart ?? textarea.selectionStart;
  const endPos = selectionEnd ?? textarea.selectionEnd;
  const scrollTop = textarea.scrollTop;

  textarea.value =
    textarea.value.substring(0, startPos) +
    insertValue +
    textarea.value.substring(endPos);
  textarea.focus();
  textarea.selectionStart = startPos + insertValue.length;
  textarea.selectionEnd = startPos + insertValue.length;
  textarea.scrollTop = scrollTop;
};

const wrapText = (
  textarea: HTMLTextAreaElement,
  prefix: string,
  suffix?: string
) => {
  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;
  const selectedText = textarea.value.substring(startPos, endPos);
  const wrapSuffix = suffix || prefix;
  const wrappedText = prefix + selectedText + wrapSuffix;

  insertText(textarea, wrappedText, startPos, endPos);
  textarea.selectionStart = startPos + prefix.length;
  textarea.selectionEnd = endPos + prefix.length;
};

// 简单的Markdown渲染器
const renderMarkdown = (markdown: string) => {
  let html = markdown;

  // 标题
  html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");

  // 加粗
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // 斜体
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // 删除线
  html = html.replace(/~~(.*?)~~/g, "<del>$1</del>");

  // 行内代码
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // 代码块
  html = html.replace(/```([^```]+)```/g, "<pre><code>$1</code></pre>");

  // 链接
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank">$1</a>'
  );

  // 无序列表
  html = html.replace(/^\* (.*$)/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");

  // 有序列表
  html = html.replace(/^\d+\. (.*$)/gm, "<li>$1</li>");

  // 段落
  html = html.replace(/\n\n/g, "</p><p>");
  html = "<p>" + html + "</p>";

  // 换行
  html = html.replace(/\n/g, "<br>");

  return html;
};

const MarkdownEditor: React.FC = () => {
  const [content, setContent] = useState(`# Markdown 编辑器

## 功能特性

这是一个功能丰富的 **Markdown 编辑器**，支持：

- *实时预览*
- **语法高亮**
- ~~删除线~~
- \`行内代码\`
- [链接](https://example.com)

### 代码块示例

\`\`\`javascript
function hello() {
  console.log("Hello World!");
}
\`\`\`

### 列表示例

1. 有序列表项1
2. 有序列表项2
3. 有序列表项3

* 无序列表项1
* 无序列表项2
* 无序列表项3`);

  const [previewMode, setPreviewMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newContent = e.target.value;
      console.log(newContent);
      setContent(newContent);
    //   console.log(content);
      setWordCount(newContent.trim().split(/\s+/).length);
      setCharCount(newContent.length);
    },
    []
  );

  // 工具栏按钮处理函数
  const handleBold = () => {
    if (textareaRef.current) {
      wrapText(textareaRef.current, "**");
    }
  };

  const handleItalic = () => {
    if (textareaRef.current) {
      wrapText(textareaRef.current, "*");
    }
  };

  const handleStrikethrough = () => {
    if (textareaRef.current) {
      wrapText(textareaRef.current, "~~");
    }
  };

  const handleUnorderedList = () => {
    if (textareaRef.current) {
      insertText(textareaRef.current, "\n* ");
    }
  };

  const handleOrderedList = () => {
    if (textareaRef.current) {
      insertText(textareaRef.current, "\n1. ");
    }
  };

  const handleLink = () => {
    if (textareaRef.current) {
      insertText(textareaRef.current, "[链接文本](url)");
    }
  };

  const handleCode = () => {
    if (textareaRef.current) {
      wrapText(textareaRef.current, "`");
    }
  };

  const handleTable = () => {
    const tableTemplate = `
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |
`;
    if (textareaRef.current) {
      insertText(textareaRef.current, tableTemplate);
    }
  };

  const handleImage = () => {
    if (textareaRef.current) {
      insertText(textareaRef.current, "![图片描述](图片URL)");
    }
  };

  const handleVideo = () => {
    if (textareaRef.current) {
      insertText(textareaRef.current, "[![视频标题](视频封面URL)](视频URL)");
    }
  };

  const handleSave = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();
    URL.revokeObjectURL(url);
    message.success("文档已保存");
  };

  const handleExport = () => {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Markdown Export</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1, h2, h3 { color: #333; }
        code { background: #f5f5f5; padding: 2px 4px; border-radius: 3px; }
        pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }
        blockquote { border-left: 4px solid #ddd; padding-left: 15px; color: #666; }
    </style>
</head>
<body>
    ${renderMarkdown(content)}
</body>
</html>
    `;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.html";
    a.click();
    URL.revokeObjectURL(url);
    message.success("HTML文件已导出");
  };

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const items = e.clipboardData.items;

      // 检查是否有图片数据
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          e.preventDefault();

          const blob = items[i].getAsFile();
          if (!blob) return;

          const reader = new FileReader();
          reader.onload = (event) => {
            if (!event.target?.result) return;

            // 这里应该上传图片到服务器，然后获取URL
            // 以下是模拟上传后的URL
            const imageUrl = event.target.result.toString();

            // 插入Markdown图片语法
            if (textareaRef.current) {
              insertText(textareaRef.current, `![粘贴的图片](${imageUrl})`);
            }
          };
          reader.readAsDataURL(blob);
          return;
        }
      }
    },
    []
  );

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 16px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Space size="small">
              {/* 格式化工具 */}
              <Tooltip title="加粗">
                <Button
                  type="text"
                  icon={<BoldOutlined />}
                  onClick={handleBold}
                />
              </Tooltip>
              <Tooltip title="斜体">
                <Button
                  type="text"
                  icon={<ItalicOutlined />}
                  onClick={handleItalic}
                />
              </Tooltip>
              <Tooltip title="删除线">
                <Button
                  type="text"
                  icon={<StrikethroughOutlined />}
                  onClick={handleStrikethrough}
                />
              </Tooltip>

              {/* 列表工具 */}
              <Tooltip title="无序列表">
                <Button
                  type="text"
                  icon={<UnorderedListOutlined />}
                  onClick={handleUnorderedList}
                />
              </Tooltip>
              <Tooltip title="有序列表">
                <Button
                  type="text"
                  icon={<OrderedListOutlined />}
                  onClick={handleOrderedList}
                />
              </Tooltip>

              {/* 插入工具 */}
              <Tooltip title="链接">
                <Button
                  type="text"
                  icon={<LinkOutlined />}
                  onClick={handleLink}
                />
              </Tooltip>
              <Tooltip title="代码">
                <Button
                  type="text"
                  icon={<CodeOutlined />}
                  onClick={handleCode}
                />
              </Tooltip>
              <Tooltip title="表格">
                <Button
                  type="text"
                  icon={<TableOutlined />}
                  onClick={handleTable}
                />
              </Tooltip>
              <Tooltip title="图片">
                <Button
                  type="text"
                  icon={<PictureOutlined />}
                  onClick={handleImage}
                />
              </Tooltip>
              <Tooltip title="视频">
                <Button
                  type="text"
                  icon={<VideoCameraOutlined />}
                  onClick={handleVideo}
                />
              </Tooltip>

              {/* 预览切换 */}
              <Tooltip title={previewMode ? "编辑模式" : "预览模式"}>
                <Button
                  type={previewMode ? "primary" : "text"}
                  icon={<EyeOutlined />}
                  onClick={() => setPreviewMode(!previewMode)}
                />
              </Tooltip>
            </Space>
          </Col>

          <Col>
            <Space>
              <Tooltip title="保存">
                <Button
                  type="text"
                  icon={<SaveOutlined />}
                  onClick={handleSave}
                />
              </Tooltip>
              <Tooltip title="导出">
                <Button
                  type="text"
                  icon={<DownloadOutlined />}
                  onClick={handleExport}
                />
              </Tooltip>
              <Tooltip title="帮助">
                <Button type="text" icon={<QuestionCircleOutlined />} />
              </Tooltip>
            </Space>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: 0, overflow: "hidden" }}>
        <div
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <div style={{ flex: 1, display: "flex" }}>
            {!previewMode && (
              <div style={{ flex: 1, padding: "16px" }}>
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={handleContentChange}
                  onPaste={handlePaste}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    outline: "none",
                    resize: "none",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    fontFamily: 'Monaco, "Courier New", monospace',
                  }}
                  placeholder="在此输入 Markdown 内容..."
                />
              </div>
            )}

            {previewMode && (
              <div
                style={{
                  flex: 1,
                  padding: "16px",
                  overflow: "auto",
                  background: "#fff",
                }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.6",
                    color: "#333",
                  }}
                />
              </div>
            )}
          </div>

          {/* 状态栏 */}
          <div
            style={{
              height: "32px",
              borderTop: "1px solid #f0f0f0",
              padding: "0 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#fafafa",
              fontSize: "12px",
              color: "#666",
            }}
          >
            <Space>
              <Text type="secondary">Markdown</Text>
              <Text type="secondary">{wordCount} 字数</Text>
              <Text type="secondary">{charCount} 行数</Text>
            </Space>

            <Space>
              <Text type="secondary">当前行: 1</Text>
              <Text type="secondary">当前列: 1</Text>
              <Text type="secondary">UTF-8</Text>
              <Text type="secondary">使用文本编辑器</Text>
            </Space>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default MarkdownEditor;

// 若 ChatUI 组件有特定类型，可在此扩展
// import { FC } from 'react';
// import { MenuProps, ButtonProps } from 'antd';

// 侧边栏菜单项类型
export type SidebarMenuItem = {
    key: string;
    label: string;
    icon?: React.ReactNode;
    children?: SidebarMenuItem[];
};

// 主区域顶部问候语类型
export type GreetingProps = {
    username: string;
};

// 输入框及操作区相关类型
export type ChatInputAreaProps = {
    onSend?: (text: string) => void;
};
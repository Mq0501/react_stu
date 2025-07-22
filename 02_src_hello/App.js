// 创建“外壳”组件APP
import React, { Component } from "react";
import Hello from "./components/Hello";

// 创建并暴露app
export default class App extends Component {
    render() {
        return (
            <div>
                <Hello />
            </div>
        );
    }
}
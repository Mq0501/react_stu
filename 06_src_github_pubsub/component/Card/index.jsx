import React, { Component } from "react";
import PubSub from "pubsub-js";

import "./index.css";
export default class index extends Component {
  state = {
    // 初始化状态
    users: [], // users初始值为数组
    isFirst: true, // 是否为第一次打开页面
    isLoading: false, // 标识是否处于加载中
    err: "", // 存储请求相关的错误信息
  };

  // 订阅消息
  componentDidMount() {
    this.token = PubSub.subscribe("users", (_, stateObj) => {
      this.setState(stateObj);
    });
  }

  // 即将卸载时取消订阅（通过this.token）
  componentWillUnmount() {
    // 取消订阅
    PubSub.unsubscribe(this.token);
  }

  render() {
    const { users, isFirst, isLoading, err } = this.state;
    return (
      <div className="row">
        {isFirst ? (
          <h2>欢迎使用请输入关键字然后点击搜索</h2>
        ) : isLoading ? (
          <h2>正在加载······</h2>
        ) : err ? (
          <h2 style={{ color: "red" }}>{err}</h2>
        ) : (
          users.map((userObj) => {
            return (
              <div key={userObj.id} className="card">
                <a href={userObj.html_url} target="_blank" rel="noreferrer">
                  <img
                    alt="avatar"
                    src={userObj.avatar_url}
                    style={{ width: "100px" }}
                  />
                </a>
                <p className="card-text">{userObj.login}</p>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

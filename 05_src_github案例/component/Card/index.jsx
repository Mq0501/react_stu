import React, { Component } from "react";

import "./index.css";
export default class index extends Component {
  render() {
    const { users, isFirst, isLoading, err } = this.props;
    return (
      <div className="row">
        {isFirst ? <h2>欢迎使用请输入关键字然后点击搜索</h2> :
        isLoading ? <h2>正在加载······</h2> :
        err ? <h2 style={{ color: "red" }}>{err}</h2> :
        (
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

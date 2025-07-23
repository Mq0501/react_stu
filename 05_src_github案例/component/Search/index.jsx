import React, { Component } from "react";
import axios from "axios";

export default class index extends Component {
  search = () => {
    // 获取用户的输入（连续解构赋值+重命名）
    const {
      keyWordElement: { value: keyWord },
    } = this;

    this.props.updateAppState({ isFirst: false, isLoading: true });

    // 发送网络请求
    axios.get(`/api/search/users?q=${keyWord}`).then(
      (response) => {
        this.props.updateAppState({
          isLoading: false,
          users: response.data.items,
        });
      },
      (error) => {
        this.props.updateAppState({ isLoading: false, err: error.message });
      }
    );
  };

  render() {
    return (
      <div>
        <section className="jumbotron">
          <h3 className="jumbotron-heading">搜索 Github 用户</h3>
          <div>
            <input
              ref={(c) => (this.keyWordElement = c)}
              type="text"
              placeholder="输入关键词点击搜索"
            />
            &nbsp;<button onClick={this.search}>搜索</button>
          </div>
        </section>
      </div>
    );
  }
}

import React, { Component } from "react";
import PubSub from "pubsub-js";
// import axios from "axios";

export default class index extends Component {
  search = async () => {
    // 获取用户的输入（连续解构赋值+重命名）
    const {
      keyWordElement: { value: keyWord },
    } = this;
    // 发布消息
    PubSub.publish("users", { isFirst: false, isLoading: true });
    //#region   发送网络请求---使用axios发送
    // axios.get(`/api/search/users2?q=${keyWord}`).then(
    //   (response) => {
    //     PubSub.publish("users", {
    //       isLoading: false,
    //       users: response.data.items,
    //     });
    //   },
    //   (error) => {
    //     PubSub.publish("users", { isLoading: false, err: error.message });
    //   }
    // );
    // #endregion


    // #region  发送网络请求--使用fetch发送（未优化）
    //     fetch(`/api/search/users2?q=${keyWord}`)
    //       .then(
    //         (response) => {
    //           console.log("联系服务器成功了");
    //           return response.json();
    //         },
    //         (error) => {
    //           console.log("联系服务器失败了", error);
    //           return new Promise(() => {});
    //         }
    //       )
    //       .then(
    //         (response) => {
    //           console.log("服务器返回数据成功", response);
    //           PubSub.publish("users", {
    //             isLoading: false,
    //             users: response.items,
    //           });
    //         },
    //         (error) => {
    //           console.log("服务器返回数据失败", error);
    //           PubSub.publish("users", { isLoading: false, err: error.message });
    //         }
    //       );
    //   };
    // #endregion

    // 发送网络请求--使用fetch发送（优化）
    try {
      const response = await fetch(`/api/search/users2?q=${keyWord}`);
      const data = await response.json();
      PubSub.publish("users", {
        isLoading: false,
        users: data.items,
      });
    } catch (error) {
      console.log("服务器返回数据失败", error);
      PubSub.publish("users", { isLoading: false, err: error.message });
    }
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

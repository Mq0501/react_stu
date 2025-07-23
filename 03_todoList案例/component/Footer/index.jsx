import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.css";

export default class Footer extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    deleteCompleted: PropTypes.func.isRequired,
  };

  //   清除所有已完成的回调
  handleClearAllDone = () => () => {
    this.props.deleteCompleted();
  };

  //   全选
  handleCheckAll = (event) => {
    this.props.checkAllTodos(event.target.checked);
  };

  render() {
    const { todos } = this.props;
    // 计算已完成的个数
    // const doneCount = todos.filter((todo) => !todo.done).length;
    const doneCount = todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0);
    // 总数
    const total = todos.length;

    return (
      <div className="todo-footer">
        <label>
          <input
            type="checkbox"
            onChange={this.handleCheckAll}
            checked={doneCount === total && total !== 0}
          />
        </label>
        <span>
          <span>已完成{doneCount}</span> / 全部{total}
        </span>
        <button onClick={this.handleClearAllDone()} className="btn btn-danger">
          清除已完成任务
        </button>
      </div>
    );
  }
}

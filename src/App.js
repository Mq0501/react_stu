import React, { Component } from 'react'
import './App.css'
import Header from './component/Header'
import Footer from './component/Fooder'
import List from './component/List'

export default class App extends Component {
    // 状态在哪里，操作状态的方法就在哪里

    // 初始化
    state = {
        todos: [
            { id: '001', name: '吃饭', done: true },
            { id: '002', name: '睡觉', done: false },
            { id: '003', name: '打代码', done: true },
            { id: '004', name: '逛街', done: false }
        ]
    }

    // addTodo用于添加一个todo，接收的参数是todo对象
    addTodo = (todoObj) => {
        // 获取原todos
        const { todos } = this.state
        const newTodos = [todoObj, ...todos]
        this.setState({
            todos: newTodos
        })
    }

    // 用于更新一个todo对象
    updateTodo = (id, done) => {
        // 获取状态中的todos
        const { todos } = this.state
        // 匹配处理数据
        const newTodos = todos.map((todoObj) => {
            if (todoObj.id === id) return { ...todoObj, done }
            else return todoObj
        })
        this.setState({
            todos: newTodos
        })
    }
    render() {
        const { todos } = this.state
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header addTodo={this.addTodo} />
                    <List todos={todos} updateTodo={this.updateTodo} />
                    <Footer />
                </div>
            </div>
        )
    }
}

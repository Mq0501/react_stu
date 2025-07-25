import React, { Component } from 'react'
import Search from './component/Search'
import Card from './component/Card'

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <Search />
                <Card />
            </div>
        )
    }
}

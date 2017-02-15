import React from 'react'
import Products from './products.jsx'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            products: JSON.parse(this.props.products)
        } 
    }
    render() {
        return (<div>
            <h1>Hello from React</h1>
            <Products db={this.state.products} />
        </div>
        )
    }
}

exports.App = App
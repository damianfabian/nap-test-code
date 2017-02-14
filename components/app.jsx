var isNode = typeof module !== 'undefined' && module.exports
  , React = isNode ? require('react') : window.React
  , ReactDOM = isNode ? require('react') : window.ReactDOM

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


if (isNode) {
  exports.App = App
} else {
  ReactDOM.render(<App data={window.___INITIAL_PROPS___}/>, document.getElementById('react-app'))
}


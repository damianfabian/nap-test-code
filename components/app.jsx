var isNode = typeof module !== 'undefined' && module.exports
  , React = isNode ? require('react') : window.React
  , ReactDOM = isNode ? require('react') : window.ReactDOM

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
            <ul>
            {
                this.state.products && this.state.products.data.map((item, i) => {
                    return <li key={i}>{item.name}</li>
                })
            }
            </ul>
        </div>
        )
    }
}


if (isNode) {
  exports.App = App
} else {
  ReactDOM.render(<App data={window.___INITIAL_PROPS___}/>, document.getElementById('react-app'))
}


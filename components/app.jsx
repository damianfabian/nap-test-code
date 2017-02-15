import React from 'react'
import Products from './products.jsx'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            products: typeof props.data === "object" ? props.data : JSON.parse(props.data)
        } 
    }
    render() {
        return (
            <div className='container' ref='container'>
                <div className='row'>
                    <div className='col-md-2' />
                    <div className='col-md-8 title'>
                        <h2>What's New</h2>
                    </div>
                    <div className='col-md-2'>
                        <select className='sortby pull-right'>
                            <option>Price</option>
                        </select>
                    </div>    
                </div>
                <div className='row'>
                    <hr className='hr-text' data-content='Total' />
                </div>
                <div className='row'>
                    <div className='col-md-3 col-xs-0 hidden-xs'>
                        <ul className='list-group'>
                            <li className='list-group-item'>Cras justo odio</li>
                            <li className='list-group-item'>Dapibus ac facilisis in</li>
                            <li className='list-group-item'>Morbi leo risus</li>
                            <li className='list-group-item'>Porta ac consectetur ac</li>
                            <li className='list-group-item'>Vestibulum at eros</li>
                        </ul>
                    </div>
                    <div className='col-md-9 col-xs-12'>
                        <Products db={this.state.products} />
                    </div>
                </div>
            </div>
        )
    }
}

exports.App = App
import React from 'react'
import Products from './products.jsx'
import FilterList from './filterlist.jsx'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            products: typeof props.data === "object" ? props.data : JSON.parse(props.data)
        } 

        this.changeFilters = this.changeFilters.bind(this)
    }

    changeFilters (e) {
        const checked = e.target.checked 
        const key = e.target.id
        const {[key]: current, ...state} = this.state
        
        console.log(key, current, e.target.checked)

        if(e.target.checked) {
            state[key] = true;
        } 

        this.setState(state, () => { console.log(this.state) })
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
                    <div className='col-md-3 col-sm-3 hidden-xs'>
                        {
                            this.state.products.filters.map((filter) => {
                                return <div key={filter.title}>
                                    <h2>{filter.title}</h2>
                                    {
                                        this.state.products.schemes.map((scheme) => {
                                            const data = filter.data.filter((item) => {
                                                return item.scheme === scheme
                                            })
                                            return <FilterList key={`${filter.title}-${scheme}`} data={data} title={scheme} onClick={this.changeFilters} />            
                                        })
                                        
                                    }
                                </div>
                            })
                        }
                    </div>
                    <div className='col-md-9 col-sm-9 col-xs-12'>
                        <Products db={this.state.products} />
                    </div>
                </div>
            </div>
        )
    }
}

exports.App = App
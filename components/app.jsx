import React, { Component, PropTypes } from 'react'
import Products from './products.jsx'
import FilterList from './filterlist.jsx'
import API from './api.js'
import config from './config.js'
import * as babel from 'babel-polyfill'
import Pagination from './pagination.jsx'

class App extends Component {
    constructor (props) {
        super(props)
        this.state ={
            products: typeof props.data === "object" ? props.data : JSON.parse(props.data)
        } 

        this.changeFilters = this.changeFilters.bind(this)
        this.refreshData = this.refreshData.bind(this)
    }

    async changeFilters (e) {
        const checked = e.target.checked 
        const key = e.target.id
        const {[key]: current, ...state} = this.state
        
        console.log(key, current, e.target.checked)

        let newState = Object.assign({}, state)

        // If it's true add the filter, if not remove it from the state
        if (e.target.checked) {
            newState.filters ? newState.filters.push(key) : newState.filters = [key]
        } else {
            newState.filters = newState.filters.filter((fil) => { return fil !== key })
        }

        const data = await API.post(config.SEARCH, {filters: newState.filters})
        newState.products = data

        this.setState(newState)
    }

    async refreshData (e, page) {
        const offset = page * this.state.products.limit
        const data = await API.post(config.SEARCH, {filters: this.state.filters, offset: offset})
        

        this.setState({ products: data })
    }

    render () {
        return (
            <div className='container' ref='container'>
                <div className='row'>
                    <div className='col-md-3 col-sm-'>
                        <select className='sortby pull-right'>
                            <option>Price</option>
                        </select>
                    </div>
                    <div className='col-md-6 title'>
                        <h2 className='title'>What's New</h2>
                    </div>
                    <div className='col-md-3'>
                        <Pagination total={this.state.products.total}
                          offset={this.state.products.offset}
                          itemsPage={this.state.products.limit}
                          onPageChange={this.refreshData}
                          onNext={this.refreshData}
                          onBack={this.refreshData}
                            />
                    </div>    
                </div>
                <div className='row'>
                    <hr className='hr-text' data-content={`${this.state.products.total} Products`} />
                </div>
                <div className='row'>
                    <div className='col-md-3 col-sm-3 hidden-sm hidden-xs'>
                        {
                            this.state.products.filters.map((filter) => {
                                return <div key={filter.title}>
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
                    <div className='col-md-9 col-sm-12 col-xs-12'>
                        <Products db={this.state.products} />
                    </div>
                </div>
            </div>
        )
    }
}

App.propTypes = {
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]) 
}
exports.App = App
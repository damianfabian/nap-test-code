import React, { Component, PropTypes } from 'react'
import Products from './products.jsx'
import FilterList from './filterlist.jsx'
import API from './api.js'
import config from './config.js'
import * as babel from 'babel-polyfill'
import Pagination from './pagination.jsx'
import FilterDropdown from './filterdropdown.jsx'

// TODO: Get these values from Server
const SORT_BY = [
    { text: 'Sort by', value: '' },
    { text: 'Low Price', value: 'lprice' },
    { text: 'High Price', value: 'hprice' },
    { text: 'Name', value: 'name' },
    { text: 'Brand', value: 'brand' },
]
const regex = /Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i

class App extends Component {
    constructor (props) {
        super(props)
        const data = typeof props.data === "object" ? props.data : JSON.parse(props.data)        
        const isMobile = typeof navigator !== 'undefined' ? regex.test(navigator.userAgent) : false
        this.state ={
            products: data,
            filtersData: this.prepareFilters(data),
            filters: [],
            orderby: '',
            page: 0,
            isMobile: isMobile 
        } 

        this.changeFilters = this.changeFilters.bind(this)
        this.refreshData = this.refreshData.bind(this)
        this.changeView = this.changeView.bind(this)
        this.changeOrder = this.changeOrder.bind(this)
        this.applyFilters = this.applyFilters.bind(this)
        this.MobileSearch = this.MobileSearch.bind(this)
    }

    prepareFilters (data) {
        
        const sortFilters = (info, schemes) => {
            let filters = {}    
            schemes.map(scheme => {
                filters[scheme] = info.filter((item) => { return item.scheme === scheme })
            })
            
            Object.keys(filters).map((key) => {
                filters[key].sort((a, b) => { return a.sort > b.sort })
            })

            return filters
        }

        return data.filters.map(filter => {
            return {
                title: filter.title,
                datas: sortFilters(filter.data, data.schemes)
            }
        })
    }

    componentDidMount () {
        window.addEventListener('resize', this.changeView)
    }

    changeView () {
        // This is only for Demo, to change View Mode with Chrome
        const isMobile = typeof navigator !== 'undefined' ? regex.test(navigator.userAgent) : false
        this.setState({ isMobile: isMobile })
    }
    
    async changeFilters (e) {
        const checked = e.target.checked 
        const key = e.target.id
        const {[key]: current, ...state} = this.state
        
        let newState = Object.assign({}, state)

        // If it's true add the filter, if not remove it from the state
        if (e.target.checked) {
            newState.filters ? newState.filters.push(key) : newState.filters = [key]
        } else {
            newState.filters = newState.filters.filter((fil) => { return fil !== key })
        }
        
        this.search(newState.filters, this.state.orderby, 0)
    }

    async applyFilters (info) {
        this.search(info, this.state.orderby, this.state.page)
    }

    async changeOrder (e) {
        const order = e.target.value 
        let newState

        // If has a value order
        if (order !== '') {
            const {orderby, ...state} = this.state
            newState = Object.assign({orderby: order}, state)
        } else { // Remove Order
            const {orderby, ...state} = this.state
            newState = Object.assign({}, state)
        }

        this.search(this.state.filters, order, this.state.page)
    }

    async refreshData (e, page) {
        this.search(this.state.filters, this.state.orderby, page)
    }

    async search (filters, orderby, page) {
        const offset = page * this.state.products.limit
        const data = await API.post(config.SEARCH, {
            filters: filters,
            offset: offset,
            orderby: orderby
        })


        this.setState({ products: data, filters: filters, orderby: orderby, page: page })
    }
    
    async MobileSearch () {
        const {page, filters, orderby} = this.state
        const offset = ((page + 1) * this.state.products.limit) + this.state.products.limit
        const data = await API.post(config.SEARCH, {
            filters: filters,
            offset: offset,
            orderby: orderby
        })
        this.setState({ page: page + 1 })
        return data
    }

    renderHeader () {
        const sortBy = <select className='sortby' onChange={this.changeOrder}>{ 
            SORT_BY.map((sort) => <option key={sort.value} value={sort.value}>{sort.text}</option>) 
        }</select>
        

        if (this.state.isMobile) {
            return <div>
                <div className='row'>
                    <h3 className='title'>{`WHAT'S NEW (${this.state.products.total} items)`}</h3>
                </div>
                <div className='row mobile-filter'>
                    <div className='col-xs-6 col-sm-6'>
                        { sortBy }
                    </div>
                    <div className='col-xs-6 col-sm-6'>
                        <FilterDropdown className='filter-button-container' datas={this.state.filtersData} title='FILTER'
                          onClick={this.applyFilters} defaultState={this.state.filters} />
                    </div>
                </div>
            </div>

        } else {
            return [
                <div className='row' key='top'>
                    <div className='col-md-3 col-sm-'>
                        { sortBy }
                    </div>
                    <div className='col-md-6 title'>
                        <h2 className='title'>WHAT'S NEW</h2>
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
                </div>,
                <div className='row' key='total'>
                    <hr className='hr-text' data-content={`${this.state.products.total} Products`} />
                </div>
            ]
        }
    }

    render () {
        return (
            <div className='container' ref='container'>
                { this.renderHeader() }
                <div className='row'>
                    <div className='col-md-3 col-sm-3 hidden-sm hidden-xs'>
                        {
                            this.state.filtersData.map((filter) => {
                                return <div key={filter.title}>
                                    {
                                        Object.keys(filter.datas).map(key => {
                                            return <FilterList key={`${filter.title}-${key}`} data={filter.datas[key]} title={key} onClick={this.changeFilters} />            
                                        })
                                    }
                                </div>
                            })
                        }
                    </div>
                    <div className='col-md-9 col-sm-12 col-xs-12'>
                        <Products db={this.state.products} onRequestData={this.MobileSearch} isMobile={this.state.isMobile} />
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
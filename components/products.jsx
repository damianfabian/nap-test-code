import React, { Component, PropTypes } from 'react';
import Product from './product.jsx'
import * as babel from 'babel-polyfill'

class ProductList extends Component {
    constructor (props) {
        super(props)
        
        this.state = this.buildState(this.props)        
        this.onScroll = this.onScroll.bind(this)
    }

    buildState (props) {
        const data = props.db.data && props.db.data.slice(0, 9) || []

        return {
            items: 9,
            page: 0,
            total : props.db.total,
            db: props.db.data,
            data: data,
            viewport: {
                top: 0,
                height: 0
            }
        }
    }
    
    componentWillReceiveProps (nextProps) {
        const data = this.buildState(nextProps)
        this.setState(data, () => this.onScroll())
    }
    
    async loadMore () {
        let data
        const {page, items, db} = this.state
        const end = ( (page+1) * items ) + items

        if ( end > db.length && this.props.isMobile ) {
            if (this.inProgress) return null
            const newData = await this.props.onRequestData()
            const newDB = [].concat(db).concat(newData.data) // Concat the current items with the new from DB
            data = newDB.slice(0, end) // Infinite Scrolling in Mobile
            // Set the new items to display and change the db with the new data
            this.inProgress = true // To Avoid send to request at the same time
            this.setState({ data: data, page: page + 1, loading: false, db: newDB}, () => { this.inProgress = false })
        } else {
            if (end > db.length) {
                data = db.slice(0, end)
                this.setState({ data: data, page: page + 1, loading: false, stopLoading: true})
                return null
            } 
            data = db.slice(0, end)
            this.setState({ data: data, page: page + 1, loading: false})
        }
        
    }

    componentDidMount () {
        window.addEventListener('scroll', this.onScroll, false);
        window.addEventListener('resize', this.updateViewport, false);
        this.onScroll()
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.onScroll);
    }
 
    onScroll (evt) {
        

        var body = document.body;
        var html = document.documentElement;

        var height = Math.max( body.scrollHeight, body.offsetHeight, 
                        html.clientHeight, html.scrollHeight, html.offsetHeight );
        var currentPos = window.scrollY + body.clientHeight;

        // Setting object for images
        this.setState({
            viewport: {
                top: window.scrollY,
                height: body.clientHeight
            }
        });

        // Checking if we need to load more products
        if ( currentPos  === height ) {
            // If reach the end of data, stop to loading more
            if (this.state.stopLoading || this.inProgress) {
                return null
            } else {
                this.setState({ loading: true })
                this.loadMore()
            }
            
        }
    }

    render () {
        return (
            <div>
                <div className='row product-container'>
                    {
                        this.state.data.map((prod) => {
                            return prod.id ? ( <Product key={prod.id} data={prod} viewport={this.state.viewport} />) :
                                null
                        })
                    
                    }
                </div>
                <div className='row'>
                    {
                        this.state.loading ? <div className='row loading'>
                            <h2>Loading...</h2>
                            <img src='/images/loading.gif' />
                        </div> : null
                    }
                </div>
            </div>
        );
    }
}

ProductList.propTypes = {
    db: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
    isMobile: PropTypes.bool,
    onRequestData: PropTypes.func
};

export default ProductList;
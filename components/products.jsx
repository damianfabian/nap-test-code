import React, { Component, PropTypes } from 'react';
import Product from './product.jsx'
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
    
    loadMore () {
        const {page, items} = this.state
        const end = (page+1) * this.state.items
        const data = this.state.db.slice(0, end + this.state.items)
        this.setState({ data: data, page: page + 1, loading: false})
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
            this.setState({ loading: true })
            this.loadMore()
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
    db: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ])
};

export default ProductList;
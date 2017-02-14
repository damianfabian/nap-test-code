import React, { Component, PropTypes } from 'react';

class ProductList extends Component {
    constructor (props) {
        super(props)
        
        this.state = this.buildState(this.props)
    }

    buildState (props) {
        const data = this.props.db.data && this.props.db.data.slice(0, 9) || []
        return {
            items: 9,
            page: 0,
            total : this.props.db.total,
            data: data
        }

        this.onScroll = this.onScroll.bind(this)
    }

    componentWillReceiveProps (nextProps) {
        const data = this.buildState(nextProps)
        this.setState(data)
    }
    
    loadMore () {
        const {page, items} = this.state
        const end = (page+1) * this.state.items
        const data = this.props.db.data.slice(0, end + this.state.items)
        this.setState({ data: data, page: page + 1})
    }

    componentDidMount () {
        const list = ReactDOM.findDOMNode(this.refs.container)
        list.addEventListener('scroll', this.onScroll);
    }

    onScroll (evt) {
        console.log(evt)
        this.loadMore()
    }

    render () {
        
        return (
            <div className='container' ref='container'>
                <div className='row'>
                    {
                        this.state.data.map((prod) => {
                            const onSale = prod.onSale ? <span className='onsale' /> : null
                            return (
                                <div key={prod.id} className='product col-md-4'>
                                    <div className='image'>
                                        { onSale }
                                        <img src={prod.images.outfit} />
                                    </div>
                                    <div className='descripcion'>
                                        <p className='brand'>{prod.designer}</p>
                                        <p className='name'>{prod.name}</p>
                                        <span className='price'>{prod.price}</span>
                                        
                                    </div>
                                </div>
                            )
                        })
                    
                    }
                </div>
            </div>
        );
    }
}

ProductList.propTypes = {
    db: PropTypes.object
};

export default ProductList;
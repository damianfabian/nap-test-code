import React, { Component, PropTypes } from 'react'
import ProductImage from './image.jsx'
import ImageSlider from './imageslider.jsx'
import CheckSelector from './checkselector.jsx'

class Product extends Component {
    constructor (props) {
        super(props)
        this.state = {
            showImage: props.showImage,
            quickView: props.quickView,
            qty: 1,
            total: parseInt(this.props.data.price.replace('£','')) * 1 // TODO: Create a formatter in front end, send only the value from API
        }

        this.updateImagePosition = this.updateImagePosition.bind(this)
    }
    
    componentWillReceiveProps (nextProps) {
        this.setState({ viewport: nextProps.viewport })
    }
    
    updateImagePosition (top, height) {
        if (this.state.showImage) {
            return;
        }

        // update showImage state if component element is in the viewport
        var min = this.props.viewport.top
        var max = this.props.viewport.top + this.props.viewport.height
        
        if ((min <= (top + height) && top <= max)) {
            this.setState({ showImage: true})
        }
    }

    quickView () {
        this.setState({ quickView: !this.state.quickView })
    }

    changeQty (e) {
        let qty = !isNaN(e.target.value) ? parseInt(e.target.value) : 1
        qty = qty > 0 ? qty : 1
        const total = parseInt(this.props.data.price.replace('£','')) * qty
        this.setState({ qty: qty, total: total })
    }

    renderQuickView (active) {
        
        const {name, designer, price, images, sizes, badges} = this.props.data
        return active ? <div className='quickview'>
            <div className='panel panel-primary'>
                <div className='panel-heading'>
                    <h3 className='panel-title'>{name}</h3>
                    <button className='btn btn-default pull-right' onClick={(e) => this.quickView(e)}>X</button>
                </div>
                <div className='panel-body'>
                    <div className='slider'>
                        <ImageSlider datas={images} alt={name} />
                    </div>
                    <div className='info'>
                        <div className='about'>
                            <p className='badges'>{badges.map(badge => <span key={badge}>{badge.replace('_',' ')}</span>)}</p>
                            <p><span>Designer:</span> {designer}</p>
                            { 
                                // TODO: Create Classes for Badges only with icons 
                            }
                            <p><span>Price:</span> {price}</p>
                        </div>
                        <div className='sizes'>
                            <CheckSelector title='Size' datas={sizes.map(size => ({value: size.id, text: size.name}))} />
                        </div>
                        <div className='qty'>
                            <h3>Quantity</h3>
                            <input type='number' defaultValue={this.state.qty} onChange={(e) => this.changeQty(e)} className='form-control' />
                        </div>
                        <div className='buy'>
                            <button className='btn btn-success'>{`Buy (£${this.state.total})`}</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div> : null
    }
    
    render () {
        const prod = this.props.data
        if (!prod) return null
        const quickView = this.renderQuickView(this.state.quickView)
        const onSale = prod.onSale ? <span className='onsale'>On Sale</span> : null
        return (
            <div key={prod.id} className='product col-md-4 col-sm-4 col-xs-4'>
                <div className='image'>
                    { onSale }
                    <ProductImage src={prod.images.outfit} 
                      alt={prod.name} 
                      viewport={this.props.viewport} 
                      showImage={this.state.showImage}
                      updateImagePosition={this.updateImagePosition}
                      onClick={(e) => this.quickView(e)} />
                </div>
                <div className='descripcion'>
                    <p className='brand'>{prod.designer}</p>
                    <p className='name'>{prod.name}</p>
                    <span className='price'>{prod.price}</span>
                    
                </div>
                { quickView }
            </div>
        )
    }
}

Product.propTypes = {
    data : PropTypes.object,
    showImage: PropTypes.bool,
    viewport: PropTypes.object,
    quickView: PropTypes.bool,
}

Product.defaultProps = {
    showImage: false
}

export default Product;
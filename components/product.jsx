import React, { Component, PropTypes } from 'react'
import ProductImage from './image.jsx'

class Product extends Component {
    constructor (props) {
        super(props)
        this.state = {
            showImage: this.props.showImage
        }

        this.updateImagePosition = this.updateImagePosition.bind(this)
    }
    
    isMobile () {
        if ( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true
        }
        else {
            return false
        }

    }
    componentWillReceiveProps (nextProps) {
        console.log(nextProps)
        this.setState({ viewport: nextProps.viewport })
    }
    
    updateImagePosition (top, height) {
        if (this.state.showImage) {
            return;
        }

        // update showImage state if component element is in the viewport
        var min = this.props.viewport.top
        var max = this.props.viewport.top + this.props.viewport.height
        
        console.log(min, max, top, height)

        if ((min <= (top + height) && top <= (max - 100))) {
            this.setState({ showImage: true})
        }
    }
    
    render () {
        const prod = this.props.data
        if (!prod) return null

        const onSale = prod.onSale ? <span className='onsale' /> : null
        return (
            <div key={prod.id} className='product col-md-4 col-sm-4 col-xs-4'>
                <div className='image'>
                    { onSale }
                    <ProductImage src={prod.images.outfit} 
                      alt={prod.name} 
                      viewport={this.props.viewport} 
                      showImage={this.state.showImage}
                      updateImagePosition={this.updateImagePosition} />
                </div>
                <div className='descripcion'>
                    <p className='brand'>{prod.designer}</p>
                    <p className='name'>{prod.name}</p>
                    <span className='price'>{prod.price}</span>
                    
                </div>
            </div>
        )
    }
}

Product.propTypes = {
    data : PropTypes.object,
    showImage: PropTypes.bool,
    viewport: PropTypes.object
}

Product.defaultProps = {
    showImage: false
}

export default Product;
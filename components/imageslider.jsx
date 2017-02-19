import React, { Component, PropTypes } from 'react'
import Image from './image.jsx'

class ImageSlider extends Component {
    constructor (props) {
        super(props)
        this.state = {
            images: [props.datas.large, props.datas.outfit],
            current: 0
        }
    }

    next (e) {
        e.preventDefault()
        const next = this.state.current + 1
        if (this.state.images.length > next) {
            this.setState({ current: next })
        }
    }

    back (e) {
        e.preventDefault()
        const next = this.state.current - 1
        if (next >= 0) {
            this.setState({ current: next })
        }
    }

    render () {
        return (
            <div className='image-slider'>
                <div className='content'>
                    <Image src={this.state.images[this.state.current]} alt={this.props.alt} showImage />
                </div>    
                <div className='controls'>
                    <a className='btn btn-back' onClick={(e) => this.back(e)}><i className='glyphicon glyphicon-chevron-left' /></a>
                    <a className='btn btn-next' onClick={(e) => this.next(e)}><i className='glyphicon glyphicon-chevron-right' /></a>
                </div>
            </div>
        )
    }
}

ImageSlider.propTypes = {
    datas: PropTypes.object,
    alt: PropTypes.string
}

export default ImageSlider
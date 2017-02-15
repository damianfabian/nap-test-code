import React, { Component, PropTypes } from 'react';

class Image extends Component {
    componentDidUpdate (prevProps) {
        if (! this.props.showImage && prevProps.viewport) {
            this.updatePosition();
        }
    }

    updatePosition () {
        var el = this.refs.el;
        this.props.updateImagePosition(el.y, el.offsetHeight);
    }

    render () {
        var img = (this.props.showImage) ? this.props.src : this.props.loader;
        return (
            <img ref='el' src={img} alt={this.props.alt} />
        );
    }
}

Image.propTypes = {
    updateImagePosition: PropTypes.func,
    showImage: PropTypes.bool,
    alt: PropTypes.string,
    src: PropTypes.string,
    loader: PropTypes.string
}

Image.defaultProps = {
    loader: '/images/loading.gif',
    showImage: false,
}

export default Image;
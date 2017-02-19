import React, { Component, PropTypes } from 'react'

class CheckSelector extends Component {
    render () {
        return (
            <div className='check-selector'>
                <h3>{this.props.title}</h3>
                <select className='form-control'>
                    {
                        this.props.datas && this.props.datas.map((check) => {
                            return <option key={check.value} value={check.value}>{check.text}</option>
                        })
                    }
                </select>
            </div>
        );
    }
}

CheckSelector.propTypes  = {
    datas: PropTypes.array,
    title: PropTypes.string
}

export default CheckSelector
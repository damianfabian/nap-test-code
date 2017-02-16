import React, {Component, PropTypes} from 'react'

class FilterList extends Component {
    render () {
        return (
            <div className='row'>
                <h3>{ this.props.title}</h3>
                <form role="form">
                    {
                        this.props.data.map((size) => {
                            return <div className="checkbox" key={size.id}>
                                <label>
                                    <input type="checkbox" id={size.id} onChange={(e) => this.props.onClick(e)} /> {size.name}
                                </label>
                            </div>
                        })
                    }
                </form>
            </div>
        )
    }
}

FilterList.propTypes = {
    onClick: PropTypes.func,
    filterData: PropTypes.string,
    data: PropTypes.array
}

export default FilterList
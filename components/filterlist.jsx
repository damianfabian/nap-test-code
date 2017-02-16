import React, {Component, PropTypes} from 'react'

class FilterList extends Component {
    render () {
        return (
            <div className='row filter-panel'>
                <h3>{ this.props.title}</h3>
                <form className='form-filter'>
                    {
                        this.props.data.map((size) => {
                            return <div className='checkbox' key={size.id}>
                                <label>
                                    <input type='checkbox' id={size.id} onChange={(e) => this.props.onClick(e)} /> {size.name}
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
    data: PropTypes.array,
    title: PropTypes.string
}

export default FilterList
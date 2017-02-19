import React, { Component, PropTypes } from 'react';

class FilterDropdown extends Component {
    constructor (props) {
        super(props)
        this.state = {
            open: false,
            filters: this.props.defaultState || []
        }
    }

    changeData (e) {
        const checked = e.target.checked 
        const key = e.target.value
        const {[key]: current, ...state} = this.state

        let newState = Object.assign({}, state)

        // If it's true add the filter, if not remove it from the state
        if (e.target.checked) {
            newState.filters ? newState.filters.push(key) : newState.filters = [key]
        } else {
            newState.filters = newState.filters.filter((fil) => { return fil !== key })
        }

        this.setState(newState)
    }

    applyFilters (e) {
        if (this.props.onClick) {
            this.props.onClick(this.state.filters)
        }
        this.toggle()
    }

    toggle (e) {
        e && e.preventDefault()
        this.setState({ open: !this.state.open })
    }

    render () {
        const popup = this.state.open ? (<div className='filter-dropdown'> {
            this.props.datas.map((filter) => {
                return <div key={filter.title}>
                    {   
                        Object.keys(filter.datas).map(key => {
                            return <div className={`filter-scheme ${key}`} key={key}>
                                <h3>{key}</h3>
                                { 
                                    filter.datas[key].map(item => {
                                        return <label key={item.id} className='checkbox-inline'>
                                            <input type='checkbox' defaultChecked={this.state.filters.indexOf(item.id) >= 0} value={item.id} onChange={(e) => this.changeData(e)} /> {item.name}
                                        </label>    
                                    })
                                }
                            </div>
                        })
                    }
                    <button className='btn btn-primary' onClick={(e) => this.applyFilters(e)}>Apply</button>
                </div>
            })
        }
        </div>) : null
        return (
            <div className={this.props.className}>
                <a className='btn filter-btn' onClick={(e) => this.toggle(e)}>
                    <span>{this.props.title}</span> <i className='glyphicon glyphicon-plus-sign' />
                </a>
                { popup }
            </div>
        );
    }
}

FilterDropdown.propTypes = {
    title: PropTypes.string,
    datas: PropTypes.array,
    className: PropTypes.string,
    schemes: PropTypes.array,
    onClick: PropTypes.func,
    defaultState: PropTypes.array
};

export default FilterDropdown;
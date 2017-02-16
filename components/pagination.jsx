import React, { Component, PropTypes } from 'react';

class Pagination extends Component {
    constructor (props) {
        super(props)
        this.state = this.buildState(this.props)
    }

    buildState (props) {
        return {
            pages: Math.ceil(props.total / props.itemsPage),
            curPage: props.offset ? props.offset / props.itemsPage : 0,
            paginationSize: props.paginationSize,
            offset: props.offset
        }
    }

    componentWillReceiveProps (nextProps) {
        this.setState(this.buildState(nextProps))
    }
    

    onPageChange (e, page) {
        if (this.props.onPageChange) {
            this.props.onPageChange(e, page)
        }
        this.setState({
            curPage: page
        })
    }

    onBack (e) {
        const page = this.state.curPage > 0 ? this.state.curPage - 1 : this.state.curPage

        if (page !== this.state.curPage) {
            if (this.props.onNext) {
                this.props.onNext(e, this.state.curPage - 1)
            }
            this.setState({
                curPage: this.state.curPage - 1
            })
        }
    }

    onNext (e) {
        const page = this.state.curPage < this.state.pages - 1 ? this.state.curPage + 1 : this.state.curPage
        
        if (page !== this.state.curPage) {
            if (this.props.onNext) {
                this.props.onNext(e, this.state.curPage + 1)
            }
            this.setState({
                curPage: this.state.curPage + 1
            })
        }
    }

    getPages () {
        let result = []
		const {pages, curPage, paginationSize} = this.state
		let endPage = pages - 1
		if (endPage <= 0) return [0]
		let startPage = Math.max(
			curPage - Math.floor(paginationSize / 2),
			0
		)
		endPage = startPage + paginationSize - 1

		if (endPage > pages - 1) {
			endPage = pages - 1
			startPage = endPage - paginationSize + 1
		}

		for (let i = startPage; i <= endPage; i++) {
			if (i >= 0) result.push(i)
		}

		return result
	}

    render () {
        return (
            <ul className='pagination'>
                {
                    [
                        <li key='back' onClick={(e) => this.onBack(e)}><span><i className='glyphicon glyphicon-menu-left' /></span></li>,
                        this.getPages().map((page) => {
                            const active = page === this.state.curPage ? 'active' : ''
                            return <li key={page} className={active} onClick={(e) => this.onPageChange(e, page)}><span>{page + 1}</span></li>
                        }),
                        <li key='next' onClick={(e) => this.onNext(e)}><span><i className='glyphicon glyphicon-menu-right' /></span></li>
                    ]
                }     
            </ul>
        );
    }
}

Pagination.propTypes = {
    total: PropTypes.number,
    itemsPage: PropTypes.number,
    paginationSize: PropTypes.number,
    offset: PropTypes.number,
    onNext: PropTypes.func,
    onBack: PropTypes.func,
    onPageChange: PropTypes.func
};

Pagination.defaultProps = {
    paginationSize: 5
}

export default Pagination;
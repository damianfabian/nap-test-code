import React from 'react'
import {mount} from 'enzyme'
import chai from 'chai'
import sinon from 'sinon'
import chaiEnzyme from 'chai-enzyme'
import Pagination from './pagination.jsx'

const expect = chai.expect
chai.use(chaiEnzyme()) // We need to tell chai to use chaiEnzyme

describe('Pagination Component', () => {
    
    it('Render with Basic Configuration', () => {
        const component = mount(<Pagination />)
        expect(component.find('.pagination')).to.have.lengthOf(1)
        expect(component.find('li')).to.have.lengthOf(0)
    });

    it('Render With Pages', () => {
        const component = mount(<Pagination total={20} />)
        expect(component.find('.pagination')).to.have.lengthOf(1)
        expect(component.find('li .glyphicon')).to.have.lengthOf(2)
        expect(component.find('li')).to.have.lengthOf(4)
    });

    it('Render With Ofsset Property', () => {
        const component = mount(<Pagination total={20} offset={10} />)
        expect(component.find('li.active')).to.have.text(2)
    });

    it('Event Handlers Works', () => {
        const onNext = sinon.spy()
        const onBack = sinon.spy()
        const onChange = sinon.spy()

        const component = mount(<Pagination total={20} onBack={onBack} onNext={onNext} onPageChange={onChange} />)
        const instance = component.instance()
        
        component.find('li.active').simulate('click')
        expect(onChange.callCount).to.be.equal(1)
        component.find('li').last().simulate('click')
        expect(onNext.callCount).to.be.equal(1)
        component.find('.back').simulate('click')
        expect(onBack.callCount).to.be.equal(1)
    });

});
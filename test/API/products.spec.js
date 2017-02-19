import server from '../../app.js'
import request from 'request'
import config from '../../config/config.js'

import productAPI from '../../routes/api/product.js'
import chai from 'chai'
import sinon from 'sinon'
import chaiEnzyme from 'chai-enzyme'
const expect = chai.expect
const mockDataAPI = { 
    data: [
            {
            "name": { "en":"Striped ribbed cotton mini skirt" },
            "price":{
                "divisor":100,
                "gross":20000
            },
            "onSale":false,
            "brand":{ "name": { "en":"Opening Ceremony" } },
            "id":1,
        },
        {
            "name": { "en":"Striped ribbed cotton mini skirt" },
            "price":{
                "divisor":100,
                "gross":10000
            },
            "onSale":false,
            "brand":{ "name": { "en":"Opening Ceremony" } },
            "id":1,
        }
    ],
    "metadata" : {
        categoryFacets: [],
        saleableStandardSizeFacets: [],
        schemes: []
    } 
}

describe('API Products Resource', () => {
    it('Get Products Work', done => {
        const data = request(config.API_URL + '/api/products', (error, response, body) => {
            const info = JSON.parse(body)
            expect(response.statusCode).to.be.equal(200)
            expect(info.total).to.be.ok
            expect(info.filters).to.be.ok
            expect(info.offset).to.not.be.ok
            expect(info.limit).to.be.equal(60)
            expect(info.data).to.have.lengthOf(60)
            done()  
        })
    })

    it('Search with Order by Low Price', done => {
        // Rewire Product Resource Data
        productAPI.__Rewire__('allProducts', mockDataAPI)
        productAPI.routes.init(server)

        request.post({url: config.API_URL + '/api/products', body: { orderby: 'lprice'}, json: true}, (err, res, body) => {
            expect(body.total).to.be.equal(2)
            expect(body.data[0].price).to.be.equal('£100')
            // Reset Product Resouce
            productAPI.__ResetDependency__('allProducts');
            done()
        })
    })
})
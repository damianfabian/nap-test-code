var config = require('../../config/config')
var _ = require('lodash');
var _builder = require(config.ROOT + '/utilities/response.js') 
var _util = require(config.ROOT + '/utilities/utilities.js') 

// Mock API using fixture so we're not dependent on network connectivity
var allProducts = require(config.ROOT +'/fixtures/products.json');

var routes = {
    init: function (app) {

        // get products list
        app.get('/api/products', function (req, res, next) {
            var total = allProducts.data.length;
            var offset = parseInt(req.query.offset) || 0;
            var limit = parseInt(req.query.limit) || 60;
            if (offset > total) {
                return res.type('json').sendStatus(400);
            }

            res.json(_builder.build({ 
                total: total, 
                offset: offset, 
                limit: limit, 
                data: allProducts, 
                type: _builder.type.LIST })
            )

        })

        app.post('/api/products', function (req, res, next) {
            var offset = parseInt(req.body.offset) || 0;
            var limit = parseInt(req.body.limit) || 60;
            var orderby = req.body.orderby || ''
            var filters = req.body.filters || []
            

            // Filter data if there is any filter
            const filterData = filters.length > 0 ? allProducts.data.filter((prod) => {
                return prod.saleableStandardSizes.findIndex((size) => {
                    return filters.indexOf(size.id) >= 0
                }) >= 0
            }) : []

            let result = filterData.length > 0 ? Object.assign({}, allProducts, {data: filterData}) : allProducts
            if (offset > result.data.length) {
                return res.type('json').sendStatus(400);
            }

            ////// ORDER BY /////////
            result.data = orderby ? _util.sortby(result.data.slice(), orderby) : result.data.slice()
            res.json(_builder.build({ 
                total: result.data.length, 
                offset: offset, 
                limit: limit, 
                data: result, 
                type: _builder.type.LIST })
            )

        })

        // get product specific details
        app.get('/api/product/:id', function (req, res, next) {

            var requestedId = Number(req.params.id);
            var productObj = _.find(allProducts, {'id': requestedId });

            var body;

            if (productObj) {
                body = _builder.build({ data: productObj, type: _builder.type.ONE })
            } else {
                body = {error: 'pid not found'}
            };

            res.json(body);
        });

    }
};



module.exports = {
    routes: routes
};

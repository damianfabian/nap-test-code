var config = require('../../config/config')
var _ = require('lodash');
var _builder = require(config.ROOT + '/utilities/response.js') 

// Mock API using fixture so we're not dependent on network connectivity
var allProducts = require(config.ROOT +'/fixtures/products.json').data;

var routes = {
    init: function(app) {

        // get products list
        app.get('/api/products', function (req, res, next) {
            var total = allProducts.length;
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

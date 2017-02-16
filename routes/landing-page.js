var config = require('../config/config')
var React = require('react')
var ReactDOM = require('react-dom/server')

var components = require(config.ROOT + '/components/app.jsx')
var App = React.createFactory(components.App)

var request = require('request');

var routes = {
    init: function(app) {

        // set up landing page
        app.get('/', function (req, res, next) {
            
            request(`${config.API_URL}/api/products`, (error, response, body) => {
                res.render('index', {
                    metadata: {
                        title: 'NAP Tech Test'
                    },
                    title: 'NAP Tech Test',
                    layout: 'default',
                    template: 'index',
                    reactData: JSON.stringify({data: body}),
                    component: ReactDOM.renderToString(App({data: body}))
                });
            });
        });

    }
};



module.exports = {
    routes: routes
};

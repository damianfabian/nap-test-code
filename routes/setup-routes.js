var config = require('../config/config');

var configureRoutes = {

    init: function(app) {

        /********* Product Routes ***********/
        var productListApiRoute = require(config.ROOT + '/routes/api/product');
        productListApiRoute.routes.init(app);

        /********* Landing Page Routes ***********/
        var landingPageRoute = require(config.ROOT + '/routes/landing-page');
        landingPageRoute.routes.init(app);

        /********* ERROR HANDLING ****************/
        var errorRoutes = require(config.ROOT + '/routes/error-handling')
        errorRoutes.routes.init(app)

    }
};

module.exports = {
    configureRoutes: configureRoutes
};
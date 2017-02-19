var config = require('../config/config');

var routes = {
    init: (app) => {
        app.use((req, res, next) => {
            var err = new Error('Route Not Found');
            err.status = 404;
            next(err);
        });

        // error handlers
        //================
        // development error handler
        // will print stacktrace
        if (config.ENV !== config.PRODUCTION) {
            app.use((err, req, res, next) => {
                console.log(err);
                res.status(err.status || 500);
                res.render('sorry', {  'body': err.message });
            });
        }

        // production error handler
        // no stacktraces leaked to user
        app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.render('sorry');
        });
    }
}

module.exports = {
    routes: routes
}
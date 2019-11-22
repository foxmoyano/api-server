'use strict';

module.exports = function(Station) {

    Station.beforeRemote('replaceOrCreate', function (ctx, inst, next) {
        next();
    });

    Station.remoteMethod(
        'getStations',
        {
            accepts: [],
            returns: [{arg: 'result', type: 'object', root: true}],
            http: {path: '/all', verb: 'get'}
        }
    );

    Station.getStations = function (done) {
        Station.find(undefined, function (err, stations) {
            if (err) {
                Logger.error('Station.getStations -> Station.find', err);
                return done(err);
            }

            done(null, stations);
        });
    };    

};

'use strict';

module.exports = function(Unit) {

    Unit.beforeRemote('replaceOrCreate', function (ctx, inst, next) {
        next();
    });

    Unit.remoteMethod(
        'unitGet',
        {
            accepts: [
                {arg: 'stationId', type: 'any', required: true}
            ],
            returns: [{arg: 'result', type: 'object', root: true}],
            http: {path: '/getby/:stationId', verb: 'get'}
        }
    );

    Unit.unitGet = function (stationId, done) {        
        var pFind = {
            "where": {
                "stationId" : stationId
            }
        };
        Unit.find(pFind, function (err, units) {
            if (err) {
                Logger.error('Unit.unitGet -> Unit.find:' + JSON.stringify(pFind), err);
                return done(err);
            }

            done(null, units);
        });
    };   

};

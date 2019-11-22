'use strict';

module.exports = function(Crime) {
    Crime.remoteMethod(
        'getCrimes',
        {
            accepts: [],
            returns: [{arg: 'result', type: 'object', root: true}],
            http: {path: '/all', verb: 'get'}
        }
    );

    Crime.getCrimes = function (done) {
        Crime.find(undefined, function (err, crimes) {
            if (err) {
                Logger.error('Crime.getCrimes -> Crime.find', err);
                return done(err);
            }

            done(null, crimes);
        });
    };	

    Crime.beforeRemote('replaceOrCreate', function (ctx, inst, next) {
        next();
    });

};

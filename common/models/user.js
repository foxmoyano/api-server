'use strict';

module.exports = function(User) {
    User.remoteMethod(
        'getUsers',
        {
            accepts: [],
            returns: [{arg: 'result', type: 'object', root: true}],
            http: {path: '/all', verb: 'get'}
        }
    );

    User.getUsers = function (done) {
        User.find(undefined, function (err, users) {
            if (err) {
                Logger.error('User.getUsers -> User.find', err);
                return done(err);
            }

            done(null, users);
        });
    };
};

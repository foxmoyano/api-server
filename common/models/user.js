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

    User.remoteMethod(
        'procedureGet',
        {
            accepts: [
                {arg: 'userId', type: 'any', required: true},
                {arg: "options", type: "object", http: "optionsFromRequest"}
            ],
            returns: [{arg: 'result', type: 'object', root: true}],
            http: {path: '/:userId/procedures', verb: 'get'}
        }
    );

    User.procedureGet = function (userId, options, done) {
        var Procedure = User.app.models.Procedure;
        var pFind = {
            "where": {
                "userId": userId
            }
        };
        User.find(pFind, function (err, procedures) {
            if (err) {
                Logger.error('User.procedureGet -> Procedure.find:' + JSON.stringify(pFind), err);
                return done(err);
            }

            done(null, procedures);
        });
    };    
};

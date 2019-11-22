'use strict';

module.exports = function(Procedure) {
    Procedure.remoteMethod(
        'getProcedures',
        {
            accepts: [],
            returns: [{arg: 'result', type: 'object', root: true}],
            http: {path: '/all', verb: 'get'}
        }
    );

    Procedure.getProcedures = function (done) {
        Procedure.find(undefined, function (err, procedures) {
            if (err) {
                Logger.error('Procedure.getProcedures -> Procedure.find', err);
                return done(err);
            }

            done(null, procedures);
        });
    };

    Procedure.remoteMethod(
        'procedureGet',
        {
            accepts: [
                {arg: 'userId', type: 'any', required: true}
            ],
            returns: [{arg: 'result', type: 'object', root: true}],
            http: {path: '/getby/:userId', verb: 'get'}
        }
    );

    Procedure.procedureGet = function (userId, done) {        
        var pFind = {
            "where": {
                "userId" : userId
            }
        };
        Procedure.find(pFind, function (err, procedures) {
            if (err) {
                Logger.error('Procedure.procedureGet -> Procedure.find:' + JSON.stringify(pFind), err);
                return done(err);
            }

            done(null, procedures);
        });
    };

    Procedure.beforeRemote('replaceOrCreate', function (ctx, inst, next) {
    	var userId = ctx.req.accessToken.userId.toString();
		ctx.req.body.fechaRecepcion = new Date();
        ctx.req.body.userId = userId;
        next();
    });

};

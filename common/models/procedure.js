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

    Procedure.beforeRemote('replaceOrCreate', function (ctx, inst, next) {
    	var userId = ctx.req.accessToken.userId.toString();
		ctx.req.body.fechaRecepcion = new Date();
        ctx.req.body.userId = userId;
        next();
    });

    Procedure.remoteMethod(
        'procedureGet',
        {
            accepts: [
                {arg: 'userId', type: 'any', required: true},
                {arg: "options", type: "object", http: "optionsFromRequest"}
            ],
            returns: [{arg: 'result', type: 'object', root: true}],
            http: {path: '/:userId', verb: 'get'}
        }
    );    

    Procedure.procedureGet = function (userId, options, done) {
        //var Procedure = Procedure.app.models.Commentary;
        var pFind = {
            "where": {
                "userId": userId
            },
            "include": [{
                "relation": "user",
            }]
        };
        Procedure.find(pFind, function (err, procedures) {
            if (err) {
                Logger.error('Procedure.procedureGet -> Procedure.find:' + JSON.stringify(pFind), err);
                return done(err);
            }

            done(null, procedures);
        });
    };    

};

module.exports = function (app) {
    var User = app.models.user;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    var emailAdmin = 'lmoyano@pragma.cl';

    addRoleWithUserAdmin(emailAdmin, function (err, result) {

    });

    function addRoleWithUserAdmin(emailAdmin, done) {
        var roleNameAdmin = 'admin';
        var pFind = {
            "where": {"name": roleNameAdmin}
        };
        //buscamos si ya fue creado o asignado este rol
        Role.find(pFind, function (err, roles) {
            if (err) {
                console.log(err);
                return done(err);
            }

            if (roles.length === 0) {
                //create the admin role
                Role.create({
                    name: roleNameAdmin
                }, function (err, role) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    console.log('DataSeedRole News--> Role.create: ' + JSON.stringify(role));

                    // associate role admin
                    associateRoleAdmin(emailAdmin, role, roleNameAdmin, done);
                });
            } else {
                var role = roles[0];
                // associate role admin
                associateRoleAdmin(emailAdmin, role, roleNameAdmin, done);
            }
        });
    }

    function associateRoleAdmin(email, role, roleNameAdmin, done) {
        var pFind = {
            "where": {"email": email},
            "include": [
                {
                    "relation": "roles"
                }
            ]
        };
        User.find(pFind, function (err, usersAdmin) {
            if (err) {
                console.log(err);
                return done(err);
            }

            if (usersAdmin.length > 0) {
                var userAdmin = usersAdmin[0];

                //validamos si no existen roles asociados
                if (userAdmin.__data.roles.length === 0) {
                    addPrincipal(userAdmin.id, role, done)
                } else {
                    //de otra forma validamos si ya tiene asociado el role admin
                    var existsRoleAdmin = false;
                    userAdmin.__data.roles.forEach(function (role) {
                        if (role.__data.name === roleNameAdmin) {
                            existsRoleAdmin = true;
                        }
                    });

                    if (!existsRoleAdmin) {
                        addPrincipal(userAdmin.id, role, done)
                    }
                }
            }
        });
    }

    function addPrincipal(userId, role, done) {
        role.principals.create({
            principalType: RoleMapping.USER,
            principalId: userId
        }, function (err, principal) {
            if (err) {
                console.log(err);
                return done(err);
            }

            console.log('DataSeedRole News--> addPrincipal: ' + JSON.stringify(principal));
            done(null, principal)
        });
    }

};
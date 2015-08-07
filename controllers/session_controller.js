// Get /login
exports.new = function(req, res) {
    var errors = req.session.errors || {};
    req.session.errors = {};
    res.render('sessions/new', {
        errors: errors
    });
};

// MW autorización a páginas restringidas
exports.loginRequired = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    };
};

// Post /login
exports.create = function(req, res) {
    var login = req.body.login;
    var password = req.body.password;
    var date = new Date();

    var userController = require('./user_controller');
    userController.autenticar(login, password, function(error, user) {
            if (error) {
                req.session.errors = [{
                    "message": 'Se ha producido un error: ' + error
                }];
                res.redirect('/login');
                return;
            }

            // Ahora sí creamos la sesión; si existe req.session.user, es que existe sesión
            req.session.user = {
                id: user.id,
                username: user.username
            };

            //@ch Save when the user login at runtime
            req.session.loginTime = Date.now().toString();
            console.log("post timeOut: " + req.session.loginTime);

            res.redirect(req.session.redir.toString());
        }

    );
};

// Delete /logout
exports.destroy = function(req, res) {
    console.log("estamos dentro de destroy quillo");
    delete req.session.user;
    delete req.session.loginTime;
    res.redirect(req.session.redir.toString());
};

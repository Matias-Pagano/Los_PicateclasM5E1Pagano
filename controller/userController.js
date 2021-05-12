const bcryptjs = require('bcryptjs');
const {
    validationResult
} = require('express-validator');

const User = require('../model/User');

const controller = {
    register: (req, res) => {
        return res.render('register');
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let userInDB = User.findByField('email', req.body.email);

        if (userInDB) {
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            });
        }

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename
        }

        const users = req.body;

        console.log(users.avatar)

        let userCreated = User.create(userToCreate);

        return res.redirect('adminUser');
    },
    login: (req, res) => {
        return res.render('login');
    },
    loginProcess: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);

        if (userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if (req.body.remember_user) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                }

                return res.redirect('/adminUser');
            }
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            });
        }

        return res.render('login', {
            errors: {
                email: {
                    msg: 'No se encuentra este email en nuestra base de datos'
                }
            }
        });
    },
    profile: (req, res) => {
        const users = User.findByField('email', req.body.email);

        if (users) {
            return res.render('adminUser', {
                user: req.session.userLogged
            });
        }
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = controller;
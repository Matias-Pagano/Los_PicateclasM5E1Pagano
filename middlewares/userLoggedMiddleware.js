const User = require('../model/User');

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	let usuarioCookie = req.cookies.userEmail;
	let userFromCookie = User.findByField('usuario', usuarioCookie);

	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}

	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}

	next();
}

module.exports = userLoggedMiddleware;
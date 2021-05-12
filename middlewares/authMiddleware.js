function authMiddleware(req, res, next) {
	if (!req.session.userLogged) {
		return res.render('/user/login');
	}
	next();
}

module.exports = authMiddleware;
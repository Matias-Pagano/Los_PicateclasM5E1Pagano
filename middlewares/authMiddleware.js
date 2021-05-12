function authMiddleware(req, res, next) {
	if (!req.session.userLogged) {
		return res.render('adminUser');
	}
	next();
}

module.exports = authMiddleware;
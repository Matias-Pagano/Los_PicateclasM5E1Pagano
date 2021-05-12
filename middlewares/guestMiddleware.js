function guestMiddleware(req, res, next) {
	if (req.session.userLogged) {
		return res.redirect('/user/adminUser');
	}
	next();
}

module.exports = guestMiddleware;
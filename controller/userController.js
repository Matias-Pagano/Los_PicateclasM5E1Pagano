const controlador = {
    register: (req, res) => {
        res.render('register')
    },
    login: (req, res) => {
        res.render('login');
    }
}

module.exports = controlador;
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index');
    });
    app.use('/register', require('./register'));
    app.use('/login', require('./login'));
    app.use('/logout', require('./logout'));
    app.use('/home', require('./home'));
    app.use('/tab1', require('./tab1'));
    app.use('/tab2', require('./tab2'));
    app.use('/tab3', require('./tab3'));
    app.use('/myComment', require('./myComment'));
    app.use('/nav',require('./nav'));
    app.use('/inf',require('./inf'));
    app.use(function (req, res) {
        if (!res.headerSent) {
            res.status(404).render('404');
        }
    })
};
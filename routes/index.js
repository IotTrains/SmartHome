module.exports = function (app) {
    
    app.get('/', function (req, res) {
        res.render('home');
    });
    
    //app.use('/register', require('./register'));//require后面的文件默认后缀为.js
    //app.use('/login', require('./login'));
    app.use('/logout', require('./logout'));
    app.use('/home', require('./home'));
    app.use('/tab1', require('./tab1'));
    app.use('/tab2', require('./tab2'));
    app.use('/tab3', require('./tab3'));
    app.use('/myComment', require('./myComment'));
    app.use('/nav',require('./nav'));
    app.use('/inf',require('./inf'));
    app.use('/signup',require('./signup'));
    app.use('/signin',require('./signin'));
    app.use(function (req, res) {
        if (!res.headerSent) {
            res.status(404).render('404');
        }
    })
};
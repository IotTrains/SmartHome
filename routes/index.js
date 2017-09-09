module.exports = function (app) {
    
    app.get('/', function (req, res) {
        res.redirect('/home');
    });
    
    app.use('/logout', require('./logout'));//require后面的文件默认后缀为.js
    app.use('/home', require('./home'));
    app.use('/tab2', require('./tab2'));
    app.use('/myComment', require('./myComment'));
    app.use('/nav',require('./nav'));
    app.use('/inf',require('./inf'));
    app.use('/signup',require('./signup'));
    app.use('/signin',require('./signin'));
    app.use('/develop',require('./develop'));
    app.use('/selfComments',require('./selfComments'));
    app.use(function (req, res) {
        if (!res.headerSent) {
            res.status(404).render('404');
        }
    })
};
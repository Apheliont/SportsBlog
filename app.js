const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const port = 3000;

// database init
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const url = 'mongodb://sportsblog:qwerty@ds161022.mlab.com:61022/sportsblog';

// routes init
const index = require('./routes/index');
const articles = require('./routes/articles');
const categories = require('./routes/categories');
const manage = require('./routes/manage');
const comments = require('./routes/comments');

// body parser init
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// express messages
app.use(require('connect-flash')());
app.use((req, res, next) => {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// express-session
const session = require('express-session');
app.use(session({
    secret: 'aaron the dog',
    resave: false,
    saveUninitialized: true
}));

// set static path
app.use(express.static(path.join(__dirname, 'public')));

// set view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// routes set
app.use('/', index);
app.use('/articles', articles);
app.use('/categories', categories);
app.use('/manage/', manage);
app.use('/comments/', comments);

// moment
app.locals.moment = require('moment');
app.locals.moment.locale('ru');

// connect to database and if success start server
mongoose.connect(url)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch(err => console.log(err));
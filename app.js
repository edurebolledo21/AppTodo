require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const todosRouter = require('./controllers/todos');
const cookieParser = require('cookie-parser');
const path = require('path');
const authExtractor = require('./middleware/auth');
const logoutRouter = require('./controllers/logout');

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI_TEST);
        console.log('conecto al servidor');
    } catch (error) {
        console.log('no conecto');
    }

})();

app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded())
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/todos', authExtractor, todosRouter);
app.use('/', express.static(path.resolve(__dirname, 'views', 'home')))
app.use('/registro', express.static(path.resolve(__dirname, 'views', 'registro')))
app.use('/log', express.static(path.resolve(__dirname, 'views', 'log')))
app.use('/app/:id', express.static(path.resolve(__dirname, 'views', 'app')))

module.exports = app;
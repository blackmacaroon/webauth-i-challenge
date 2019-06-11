const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js');

const server = express();

const sessionConfig = {
      name: 'worcalyak',
      secret: "at first people refuse to believe that a strange new thing can be done, then they begin to hope it can’t be done, then they see it can be done — then it is done and all the world wonders why it was not done centuries ago",
      cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            secure: false,
            httpOnly: true,
      },
      resave: false,
      saveUninitialized: true,
      store: new KnexSessionStore({
            knex: require('../data/dbConfig.js'),
            tablename: 'sessions',
            sidfieldname: 'sid',
            createTable: true,
            clearInterval: 1000 * 60 * 60,
      }),    
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

// sanity check route 
server.get('/', (req, res) => {
      res.send(`<h2>nailed it!</h2>`)
      .catch(err => {
            console.log(`\nERROR`, err);
            res.status(500).json({ error: "i cant. even."})
      })
});

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

module.exports = server;
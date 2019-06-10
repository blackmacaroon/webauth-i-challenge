const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());


// sanity check route 
server.get('/', (req, res) => {
      res.send(`<h2>nailed it!</h2>`)
      .catch(err => {
            console.log(`\nERROR`, err);
            res.status(500).json({ error: "i cant. even."})
      })
    });

module.exports = server;
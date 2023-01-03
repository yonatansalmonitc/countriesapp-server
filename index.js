const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
require('dotenv').config();
const countriesRoute = require('./routes/countriesRoute');
const usersRoute = require('./routes/usersRoute');
const dbConnection = require('./knex/knex');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('combined'))
app.use(express.json());
app.use(cookieParser());
app.use(express.static('images'))
app.use(cors({ origin: ['http://localhost:3000', 'https://countriesapp-client.vercel.app'], credentials: true }))
app.use('/countries', countriesRoute);
app.use('/users', usersRoute);

dbConnection.migrate.latest().then((migration) => {
  if (migration) {
    console.log('Connected to DB', migration);
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  }
});

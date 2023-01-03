const bcrypt = require('bcrypt');
const e = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getUserByEmailModel } = require('../models/usersModels');

const passwordsMatch = (req, res, next) => {
  const { password, repassword } = req.body;
  if (password !== repassword) {
    res.status(400).send('Password dont match');
    return;
  }

  next();
};

const isNewUser = async (req, res, next) => {
  const user = await getUserByEmailModel(req.body.email);
  if (user) {
    res.status(400).send('User already exists');
    return;
  }
  next();
};

const hashPwd = (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    req.body.password = hash;
    next();
  });
};

const doesUserExist = async (req, res, next) => {
  const user = await getUserByEmailModel(req.body.email);
  if (!user) {
    res.status(400).send('User with this email does not exist');
    return;
  }

  req.body.user = user;
  next();
};

const auth = (req, res, next) => {
  if(!req.cookies.token) {
    res.status(401).send('Must have access token')
    return
  }

  jwt.verify(req.cookies.token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send('Unauthorized');
      return;
    }

    if (decoded) {
      req.body.userId = decoded.id;
      next();
      return
    }
  });
};

module.exports = { passwordsMatch, isNewUser, hashPwd, doesUserExist, auth };

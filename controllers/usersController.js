const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { addUserModel } = require('../models/usersModels');

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = {
      username: name,
      email: email,
      password: password,
    };
    const userId = await addUserModel(newUser);

    res.send({ userId: userId, ok: true });
  } catch (err) {
    res.status(500).send(err);
  }
};

const login = async (req, res) => {
  const { password, user } = req.body;
  try {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (!result) {
        res.status(400).send('Incorrect Password');
      } else {
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
          maxAge: 86000000,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production' ? true : false,
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        });
        res.send({ ok: true, userId: user.id });
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { signup, login };

const dbConnection = require('../knex/knex');

const getUserByEmailModel = async (email) => {
  try {
    const user = await dbConnection.from('users').where({ email: email }).first();
    return user;
  } catch (err) {
    console.log(err);
  }
};

const addUserModel = async (newUser) => {
  try {
    const [id] = await dbConnection.from('users').insert(newUser);
    return id;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getUserByEmailModel, addUserModel };

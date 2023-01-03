const fs = require('fs');
const path = require('path');
const pathToCountriesDB = path.resolve(__dirname, '../database/countriesDB.json');
const dbConnection = require('../knex/knex')


async function readAllCountriesModel() {
  try {
    const countriesList = await dbConnection.from('countries')
    return countriesList
  } catch (err) {
    console.log(err);
  }
}

async function addCountryModel(newCountry) {
  try {
    const [id] = await dbConnection.from('countries').insert(newCountry)
    return id;
  } catch (err) {
    console.log(err);
  }
}

async function deleteCountryModel(countryId) {
  try {

    const deleted = await dbConnection.from('countries').where({id:countryId}).del()
    return deleted
  } catch (err) {
    console.log(err);
  }
}

module.exports = { readAllCountriesModel, addCountryModel, deleteCountryModel };

const { deleteCountryModel, readAllCountriesModel, addCountryModel } = require('../models/countriesModels');

const deleteCountry = async(req, res) => {
  const { countryId } = req.params;
  const deleted = await deleteCountryModel(countryId);
  if (deleted) {
    res.send({ ok: true, deletedId: countryId });
  }
};

const addCountry = async (req, res) => {
  try {
    
    const {name, capital} = req.body
    console.log(req.file)
    const newCountry = {
      name: name,
      capital: capital,
      imageUrl: req.file.path
      
    };
    const id = await addCountryModel(newCountry);

    newCountry.id = id
  

    res.send(newCountry);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getAllCountries = async (req, res) => {
  try {
    const allCountries = await readAllCountriesModel();
    res.send(allCountries);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { deleteCountry, addCountry, getAllCountries };

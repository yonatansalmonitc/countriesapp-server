const express = require('express');
const { addCountryModel, readAllCountriesModel, deleteCountryModel } = require('../models/countriesModels');
const { auth } = require('../middleware/usersMiddleware');
const { v4: uuidv4 } = require('uuid');
const CountriesController = require('../controllers/countriesController');
const { upload, generateUrl } = require('../middleware/imagesMiddleware');

const router = express.Router();

///Add Validation Middleware to POST/PUT routes
router.post('/', auth, upload.single('countryImage'), CountriesController.addCountry);
router.get('/', auth, CountriesController.getAllCountries);

router.delete('/:countryId', auth, CountriesController.deleteCountry);




module.exports = router;

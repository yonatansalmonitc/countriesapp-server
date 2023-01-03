const multer = require('multer')
const path = require('path')
const pathToImages = path.resolve(__dirname, '../images')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// const diskStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, pathToImages);
  
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
//     },
//   });


  cloudinary.config({ 
    cloud_name: 'dm4rue7fk', 
    api_key: '882889117265694', 
    api_secret: 'G06uyjrw0LUjpFvQext2l9fe78Q' 
  });

  const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  });
  
  
  const upload = multer({ storage: cloudStorage });



  const generateUrl = (req, res, next) => {
    console.log(req.file.filename)
    const imageUrl = `http://localhost:8080/${req.file.filename}`
    req.body.imageUrl = imageUrl;
    next()
  }


  module.exports = {upload, generateUrl}
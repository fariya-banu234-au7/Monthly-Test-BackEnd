const express = require('express');
const excelController = require('../controllers/excelController');

const router = express.Router();


router.route('/').post(excelController.uploadUserFile, excelController.createUser)


module.exports = router;
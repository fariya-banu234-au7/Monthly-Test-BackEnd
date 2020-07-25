const express = require('express');
const excelController = require('../controllers/excelController');

const router = express.Router();


router.route('/').post(excelController.createResult)


module.exports = router;
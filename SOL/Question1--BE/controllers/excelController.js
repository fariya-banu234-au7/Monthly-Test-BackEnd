const Excel = require('../model/excelModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer')
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/')
    },
    filename: (req, file, cb) => {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

exports.uploadUserFile = multer({ //multer settings
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');

exports.createUser = async (req, res) => {
    var exceltojson;
    var upload = multer({
        storage: storage,
        fileFilter: (req, file, callback) => {
            if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
                return callback(new Error('Wrong extension type'));
            }
            callback(null, true);
        }
    }).single('file');
    upload(req, res, async(err) => {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        /** Multer gives us file info in req.file object */
        if (!req.file) {
            res.json({ error_code: 1, err_desc: "No File Passed" });
            return;
        }
        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders: true
            }, async (err, result) => {
                if (err) {
                    return res.status(404).json({ error_code: 1, err_desc: err, data: null });
                }
                const newUser = await Excel.create(result);
                res.status(201).json({ error_code: 0, err_desc: null, data: result });
            });
        } catch (e) {
            res.status(404).json({ error_code: 1, err_desc: "Corupted Excel File" });
        }
    })
};
import Excel from '../model/excelModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import multer from 'multer';

var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});


exports.uploadUserFile = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) {
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
        fileFilter: function (req, file, callback) {
            if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
                return callback(new Error('Wrong extension type'));
            }
            callback(null, true);
        }
    }).single('file');
    upload(req, res, function async(err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        /** Multer gives us file info in req.file object */
        if (!req.file) {
            res.json({ error_code: 1, err_desc: "No file passed" });
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
            }, async function (err, result) {
                if (err) {
                    return res.status(404).json({ error_code: 1, err_desc: err, data: null });
                }
                const newUser = await Excel.create(result);
                res.status(201).json({ error_code: 0, err_desc: null, data: result });
            });
        } catch (e) {
            res.status(404).json({ error_code: 1, err_desc: "Corupted excel file" });
        }
    })
};

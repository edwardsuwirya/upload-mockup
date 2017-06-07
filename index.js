/**
 * Created by edo on 06/06/2017.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8888;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:6969");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var router = express.Router();
router.get('/', function (req, res) {
    res.json({
        responseCode: "0",
        responseDescription: "[{\"articleGroupCode\":\"1\",\"articleGroupName\":\"2\"}," +
        "{\"articleGroupCode\":\"3\",\"articleGroupName\":\"4\"}]"
    });
});

router.post('/upload', function (req, res) {
    var upload = multer({
        storage: storage
    }).single('file');
    upload(req, res, function (err) {
        console.log(req.body);
        res.json({
            responseCode: "0",
            responseDescription: "File is uploaded"
        });
    })
})

app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);

var express = require('express');
var router = express.Router();
var request = require("request");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('weather.html', { root: 'public' });
});

router.get('/getcity', function(req, res, next) {
    console.log("In getcity route");
    var fs = require('fs');
    fs.readFile(__dirname + '/cities.dat.txt', function(err, data) {
        if (err) throw err;
        var cities = data.toString().split("\n");
        var myRe = new RegExp("^" + req.query.q);
        console.log(myRe);
        var jsonresult = [];
        for (var i = 0; i < cities.length; i++) {
            var result = cities[i].search(myRe);
            if (result != -1) {
                console.log(cities[i]);
                jsonresult.push({ city: cities[i] });
            }
        }
        console.log(jsonresult);
        res.status(200).json(jsonresult);
    });
});

router.get('/dictionary', function(req, res, next) {
    var url = "https://owlbot.info/api/v1/dictionary/";
    url += req.query['q'];
    url += "?format=json";
    console.log(url);
    request(url).pipe(res);
});

module.exports = router;

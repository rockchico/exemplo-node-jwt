var express = require('express');
var app = express();

app.post('/login', function (req, res) {
    console.log(req);
    res.send('Hello World!');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
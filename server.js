const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');

app.use(compression());
app.use(express.static(__dirname + '/dist/everest'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/everest/index.html'));
});

app.listen(process.env.PORT || 3000);
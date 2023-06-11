/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import compression from 'compression';

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('/', function(req, res) {
    console.log("Sending file : ");
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
    if(err) console.error(err);
});
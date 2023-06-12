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

app.get('/users', function(req, res) {
    res.json([
        {"id": 1, "firstName":"Nick", "lastName":"Koldys", "email":"nick@gmail.com"}, 
        {"id": 2, "firstName":"Theo", "lastName":"C", "email":"tC@yahoo.com"}, 
        {"id": 3, "firstName":"CalQuin", "lastName":"C", "email":"rumble_Bois@yahoo.com"}
    ]);
});

app.listen(port, function(err) {
    if(err) console.error(err);
});
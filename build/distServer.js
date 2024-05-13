/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import { logg } from '../utils/logger';

const port = 3000;
const app = express();

// app.use(compression());
app.use(express.static('dist'));

app.get('/', function(req, res) {
    logg( 0, "Sending file : " );
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
    if(err) logg( 0, err );
});
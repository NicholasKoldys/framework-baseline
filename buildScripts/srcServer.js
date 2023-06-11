/* eslint-disable no-console */
import express from 'express';
import webpack from 'webpack';
import config from '../webpack.config.dev.mjs';
/* // ! USE IN DEV ONLY */
import middleware from 'webpack-dev-middleware';
import chalk from 'chalk';

const port = 3000;
const app = express();
const compiler = webpack(config);

/* // * Express requires bundlers to be 
declared in "use" */
app.use(middleware(compiler, { 
    // noInfo: true,
    publicPath: config.output.publicPath
}));

app.get('/users', function(req, res) {
    res.json([
        {"id": 1, "firstName":"Nick", "lastName":"Koldys", "email":"nick@gmail.com"}, 
        {"id": 2, "firstName":"Theo", "lastName":"Carter", "email":"tC@yahoo.com"}, 
        {"id": 3, "firstName":"CalQuin", "lastName":"Carter", "email":"rumble_Bois@yahoo.com"}
    ]);
});

console.log(chalk.magenta("Hosting at: http://localhost:3000\n\n"));
app.listen(port, function(err) {
    if(err) console.error(err);
});
/* eslint-disable no-console */
import express from 'express';
import webpack from 'webpack';
import config from '../webpack.config.dev.mjs';
/* // ! USE IN DEV ONLY */
import middleware from 'webpack-dev-middleware';
import { logg } from '../utils/logger';

const PORT = 3999;
const app = express();
const compiler = webpack(config);

/**
 * * Callback for response injection.
 * @callback pathResponse
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

/**
 * 
 * @param {string} path 
 * @param {pathResponse} callback
 */
export function apiInjectionPoint( path, callback ) {
    app.get( path, ( req, res ) => {
        callback( req, res );
    } );
}

/* // * Express requires bundlers to be 
declared in "use" */
app.use(middleware(compiler, { 
    // noInfo: true,
    publicPath: config.output.publicPath
}));

// app.get('/users', function(req, res) {
//     res.json([
//         {"id": 1, "firstName":"Nick", "lastName":"Koldys", "email":"nick@gmail.com"}, 
//         {"id": 2, "firstName":"Theo", "lastName":"C", "email":"tC@yahoo.com"}, 
//         {"id": 3, "firstName":"CalQuin", "lastName":"C", "email":"rumble_Bois@yahoo.com"}
//     ]);
// });

logg( 4, `Hosting at: http://localhost:${PORT}\n\n` );
app.listen(PORT, function(err) {
    if(err) logg( 1, err );
});
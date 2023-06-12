/* This script generates mock data for local development. 
This way you dont have o point to an actual API, 
but ou can enjoy realistic , but randomized data, 
and rapid page loads due to local, static data. */

/* eslint-disable no-console */

import jsf from "json-schema-faker";
import { schema } from './mockDataSchema';
import fs from 'fs';

const json = JSON.stringify( jsf.generate(schema) );

fs.writeFile("./src/api/users/db.json", json, function (err) {
    if (err) return console.log(err);
    console.log( "Mock data generated.");
})
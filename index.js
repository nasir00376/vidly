const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const { genres, customers, movies, rentals, users } = require('./router');
const connectDB = require('./config/db');
const URL = require('url-parse');

const app = express();

// const validateURL = (url) => {
//     const parseUrl = URL(url, true);
//     if (!parseUrl.hostname) {
//         // Check whether is contains ip address
//         const privateIp = /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/;
//         console.log('ip', privateIp.test(url));
//         console.log('You cannot set Webhook to hostname without a top level domain');
//     }

//     if (parseUrl.hostname === 'localhost') {
//         console.log('You cannot set Webhook to URL that have localhost')
//     }
// }

function validateURL(str)
{
  regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {
          return true;
        }
        else
        {
          return false;
        }
}

const url = new URL('localhost.com');

const vu  = validateURL(url);
console.log('res', vu);

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');

    process.exit(1);
}
connectDB();

// Middleware
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);


const port = process.env.PORT | 4000;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
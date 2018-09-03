const express = require('express');
const { genres, customers, movies } = require('./router');
const connectDB = require('./config/db');

const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);


const port = process.env.PORT | 4000;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
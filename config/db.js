const Debug = require('debug');
const mongoose = require('mongoose');

const debug = Debug('Vidly:config');

const conenctDB = async () => {

    try {
        await mongoose.connect(`mongodb://localhost/vidly`);
        debug(`MongoDB connected successfully`);
    } catch (error) {
        debug(`Could\'t connect to database: ${error}`);
    }

}

module.exports = conenctDB;
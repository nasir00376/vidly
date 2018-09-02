const mongoose = require('mongoose');

const conenctDB = async () => {

    try {
        await mongoose.connect(`mongodb://localhost/vidly`);
        console.log(`Connected to MongoDb...`);
    } catch (error) {
        console.log(`Could\'t connect to database: ${error}`);
    }

}

module.exports = conenctDB;
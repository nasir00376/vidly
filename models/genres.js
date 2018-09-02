const Joi = require('joi');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const Genre = mongoose.model('Genre', new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(genre, schema);
}

module.exports = {
    Genre,
    validate: validateGenre
};

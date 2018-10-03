const Joi = require('joi');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const genreSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(genre, schema);
}

module.exports = {
    Genre,
    GenreSchema: genreSchema,
    validate: validateGenre
};

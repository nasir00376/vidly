const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Customer = mongoose.model('Customer', new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: Boolean,
    default: false
}));

function validateCustomer(customer) {
    console.log(customer);
    // process.exit();
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    }

    return Joi.validate(customer, schema);
}

module.exports = {
    Customer,
    validate: validateCustomer
};

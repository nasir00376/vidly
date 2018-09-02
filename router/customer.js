const express = require('express');
const { Customer, validate } = require('../models/customer');

const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async (req, res) => {
    // Validate
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, phone, isGold } = req.body;

    let customer = new Customer({
        name,
        phone,
        isGold
    });
    customer = await customer.save();

    res.send(customer)
});

router.put('/:id', async (req, res) => {
    // validate genres
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // find genres and update
    const { name, phone, isGold } = req.body;

    const customer = await Customer.findByIdAndUpdate(req.params.id, { name, phone, isGold }, {
        new: true
    });
    
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);

})

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

module.exports = router;
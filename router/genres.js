const express = require('express');
const { Genre, validate } = require('../models/genres');

const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', async (req, res) => {
    // Validate
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre)
});

router.put('/:id', async (req, res) => {
    // validate genres
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // find genres and update
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    
    if (!genre) return res.status(404).send('customer');

    res.send(genre);

})

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('customer');

    res.send(genre);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('customer');

    res.send(genre);
});

module.exports = router;
const Joi = require('joi')
const express = require('express')
const router = express.Router()

const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
];

router.get('/', (req,res) => {
    res.send(genres)
});

router.post('/', (req,res) => {
    const genresSchema = {
        name: Joi.string().min(3).required()
    }  
    const result = Joi.validate(req.body, genresSchema)

    if (result.error) {
        return res.status(400).send(result.error.details[0].message)
    }

    
    const newGenre = {
        id: genres.length() +1,
        name: req.body.name
    }

    genres.push(newGenre)
    res.send(newGenre)
    
})

router.get('/:id', (req,res) => {
    const genre = genres.find(g => g.id === req.params.id)
    if (!genre) {
        res.status(404).send('Not found')
    }

    res.send(genre)
})

router.put('/:id', (req,res) => {
    const genre = genres.find(g => g.id === req.params.id)
    if (!genre) {
        return res.status(404).send('Not found')
    }

    const genresSchema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, genresSchema)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
    }

    genre.name = req.body.name
    res.send(genre)
    
})

router.delete('/:id', (req,res) => {
    const genre = genres.find(g => g.id === req.params.id)

    if (!genre) {
        res.status(404).send('Not found')
    }

    const index = genres.indexOf(genre)
    genres.splice(index, 1)

    res.send(genre)
})
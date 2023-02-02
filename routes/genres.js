const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

const {Genre, validateGenre} = require('../models/genre')
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const validateObjectid = require('../middleware/validateObjectid');

router.get('/', async (req,res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.post('/', auth, async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name })
  genre = await genre.save()

  res.send(genre)
});

router.put('/:id', [auth, validateObjectid], async (req, res) => {
  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name}, {
    new: true
  })

  if (!genre) return res.status(404).send('The genre not defined')

  res.send(genre);
});

router.delete('/:id', [auth,admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id)

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', validateObjectid, async (req, res) => {
  const genre = await Genre.findById(req.params.id)

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});



module.exports = router;
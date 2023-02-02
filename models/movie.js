const mongoose = require('mongoose')
const Joi = require('joi')
const { schema } = require('joi/lib/types/object')
const {genreSchema} = require('./genre')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength:3,
        maxlength:50,

    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required:true,
        min:0,
        max:255
    },
    dailyRentalRate: {
        type: Number,
        required:true,
        min:0,
        max:255
    }
})

const Movie = mongoose.model('Movie', movieSchema)


// async function createMovie() {
//     const movie = new Movie({
//         title:'No time',
//         genre: {
//             name:'Action'
//         },
//         numberInStock:1,
//         dailyRentalRate:100
//     })
//     const result = await movie.save()
//     console.log(result)
// }

// createMovie()

function validateMovie(movie) {
    const Schema = {
        title: Joi.string().min(3).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0),
        dailyRentalRate: Joi.number().min(0)
    }

    return Joi.validate(movie, Schema)
}

exports.Movie = Movie;
exports.movieValidate = validateMovie;

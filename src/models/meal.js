const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Podaj nazwę dania!']
    },
    hungryGuy: {
        type: String,
        required: [true, 'Podaj swoje imię.']
    },
    cost: {
        type: Number,
        required: [true, 'Podaj cenę dania!']
    }
});

exports.mealSchema = mealSchema;
exports.Meal = mongoose.model('Meal', mealSchema);

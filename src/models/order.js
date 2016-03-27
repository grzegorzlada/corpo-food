const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mealSchema = require('./meal').mealSchema;

const orderSchema = new Schema({
    deadline: {
        type: Date,
        deafult: Date.now(),
        required: [true, 'Nie zapomnij o dedlajnie!'],
        min: [Date.now(), 'Dedlajn nie może być w przeszłości']
    },
    deliveryTime: {
        type: Date,
        required: [true, 'Czas dostawy jest wymagan!'],
        min: [Date.now(), 'Czas dostawy nie może być w przeszłości']
    },
    restaurant: {
        type: String,
        maxlength: 25,
        required: [true, 'Nazwa lokalu jest wymagana!']
    },
    menu: {
        type: String,
        required: [true, 'Menu jest wymagane! Wrzuć linka do menu.']
    },
    description: {
        type: String
    },
    password: {
        set: generateHash,
        type: String,
        required: [true, 'Podaj hasło do edycji.']
    },
    author: {
        type: String,
        required: [true, 'Podaj imię!']
    },
    deliveryCost: {
        type: Number,
        default: 0
    },
    extraCostPerMeal: {
        type: Number,
        default: 0
    },
    state: String,
    meals: [{ref: mealSchema}]
});

function generateHash (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

orderSchema.methods.validPassword = password => {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Order', orderSchema);

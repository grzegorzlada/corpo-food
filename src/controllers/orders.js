'use strict';
const Order = require('../models/order');
const Meal = require('../models/meal').Meal;
const HttpStatus = require('http-status');
const OrderState = require('../enums/orderState');
const Logger = require('../logger');
const mapHourToDate = require('../services/dateManipulation').mapHourToDate;
const errorsHandler = require('../services/errorsHandler');

exports.list = (req, res) => {
    Order.find({}, (error, orders) => {
        if (error) {
            Logger.info(error.message);
            res.sendStatus(HttpStatus.BAD_REQUEST);
            return;
        }

        const mappedOrders = orders.map((order) => {
            return {
                id: order._id,
                deadline: order.deadline,
                hungryGuysCount: order.meals.length,
                author: order.author,
                restaurant: order.restaurant,
                state: order.state
            };
        });

        res.json(mappedOrders);
    });
};

exports.get = (req, res) => {
    Order.findById(req.params.id, (error, order) => {
        if (error) {
            Logger.info(error.message);
            res.sendStatus(HttpStatus.BAD_REQUEST);
            return;
        }

        const orderToSend = {
            id: order._id,
            author: order.author,
            deadline: order.deadline,
            deliveryCost: order.deliveryCost,
            deliveryTime: order.deliveryTime,
            description: order.description,
            extraCostPerMeal: order.extraCostPerMeal,
            menu: order.menu,
            restaurant: order.restaurant,
            state: order.state
        };

        res.json(orderToSend);
    });
};

exports.create = (req, res) => {
    const newOrder = req.body;

    const mappedOrder = {
        deadline: mapHourToDate(newOrder.deadline),
        deliveryTime: mapHourToDate(newOrder.deliveryTime),
        restaurant: newOrder.restaurant,
        menu: newOrder.menu,
        description: newOrder.description,
        password: newOrder.password,
        author: newOrder.author,
        deliveryCost: parseInt(newOrder.deliveryCost, 10),
        extraCostPerMeal: parseInt(newOrder.extraCostPerMeal, 10),
        state: OrderState.Open
    };

    const order = new Order(mappedOrder);

    order.save((error) => {
        if (error) {
            Logger.info(error.message);
            res.status(HttpStatus.BAD_REQUEST);
            res.send(errorsHandler(error.errors));
            return;
        }

        res.sendStatus(HttpStatus.OK);
    });
};

exports.addMeal = (req, res) => {
    const mealInput = req.body;

    const mealToAdd = new Meal({
        cost: mealInput.cost,
        hungryGuy: mealInput.hungryGuy,
        name: mealInput.name
    });

    mealToAdd.validate(validationError => {
        if (validationError) {
            Logger.info(validationError.message);
            res.status(HttpStatus.BAD_REQUEST);
            res.send(errorsHandler(validationError.errors));
            return;
        }

        Order.findOneAndUpdate({_id: mealInput.orderId, state: OrderState.Open}, {
            $push: {
                meals: mealToAdd
            }
        }, (error, order) => {
            if (error) {
                Logger.info(error.message);
                res.sendStatus(HttpStatus.BAD_REQUEST);
                return;
            }

            if (!order) {
                res.sendStatus(HttpStatus.NOT_FOUND);
                return;
            }

            res.json({mealId: mealToAdd._id});
        });
    });
};

exports.removeMeal = (req, res) => {
    const mealInput = req.body;

    Order.findOneAndUpdate({_id: mealInput.orderId, state: OrderState.Open}, {
        $pull: {
            meals: {_id: mealInput.id}
        }
    }, (error, order) => {
        if (error) {
            Logger.info(error.message);
            res.sendStatus(HttpStatus.BAD_REQUEST);
            return;
        }

        if (!order) {
            res.sendStatus(HttpStatus.NOT_FOUND);
            return;
        }

        res.sendStatus(HttpStatus.OK);
    });
};

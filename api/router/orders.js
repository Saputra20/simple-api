const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');

router.get('/', (req, res, next) => {
    Order.find()
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc.length >= 0) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: "No entries found"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            });
        });
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;

    Order.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(400).json({
                    message: "Not valid entry found for provider ID"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity
    })
    order
        .save()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Order.update({ _id: id }, {
        $set: updateOps
    })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.remove({ _id: id })
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router
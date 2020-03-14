const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'URL /orders Method GET Success to access!!'
    });
});

router.post('/', (req, res, next) => {
    const orders = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(200).json({
        message: 'URL /orders Method POST Success to access!!',
        data: orders
    });
});

router.put('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'URL /orders/:orderId Method PUT Success to access!!',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'URL /orders/:orderId Method DELETE Success to access!!',
        orderId: req.params.orderId
    });
});

module.exports = router
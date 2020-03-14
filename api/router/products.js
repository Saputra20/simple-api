const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'URL /products Method GET Success to access!!'
    });
});

router.post('/', (req, res, next) => {
    const products = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(200).json({
        message: 'URL /products Method POST Success to access!!',
        data: products
    });
});

router.put('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'URL /products/:productId Method PUT Success to access!!',
        productId: req.params.productId
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'URL /products/:productId Method DELETE Success to access!!',
        productId: req.params.productId
    });
});

module.exports = router
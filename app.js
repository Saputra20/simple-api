const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const product = require('./api/router/products');
const order = require('./api/router/orders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Controll-Allow-Origin', '*');
    res.header(
        'Access-Controll-Allow-Headers',
        'Origin', 'X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Controll-Allow-Methods', 'PUT, PATCH, DELETE, GET ,POST');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', product);
app.use('/orders', order);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = '404';
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
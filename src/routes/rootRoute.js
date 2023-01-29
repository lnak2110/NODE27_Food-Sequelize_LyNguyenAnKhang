const express = require('express');
const restaurantRoute = require('./restaurantRoute');
const userRoute = require('./userRoute');

const rootRoute = express.Router();

rootRoute.use('/restaurant', restaurantRoute);
rootRoute.use('/user', userRoute);

module.exports = rootRoute;

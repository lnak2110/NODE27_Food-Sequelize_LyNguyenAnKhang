const express = require('express');
const {
  getLikeByRestaurantId,
  toggleLikeRestaurantById,
  rateRestaurantById,
  getRateByRestaurantId,
} = require('../controllers/restaurantController');

const restaurantRoute = express.Router();

restaurantRoute.get('/getLikeByRestaurantId/:resId', getLikeByRestaurantId);
restaurantRoute.get('/getRateByRestaurantId/:resId', getRateByRestaurantId);
restaurantRoute.post(
  '/toggleLikeRestaurantById/:resId',
  toggleLikeRestaurantById
);
restaurantRoute.post('/rateRestaurantById/:resId', rateRestaurantById);

module.exports = restaurantRoute;

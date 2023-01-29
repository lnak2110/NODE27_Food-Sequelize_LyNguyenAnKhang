const express = require('express');
const {
  getLikeByUserId,
  getRateByUserId,
  orderFood,
} = require('../controllers/userController');

const userRoute = express.Router();

userRoute.get('/getLikeByUserId/:userId', getLikeByUserId);
userRoute.get('/getRateByUserId/:userId', getRateByUserId);
userRoute.post('/orderFood', orderFood);

module.exports = userRoute;

const { successCode, errorCode, failCode } = require('../config/response');
const models = require('../models');

const getLikeByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await models.user.findAll({
      include: 'res_like_by_user',
      where: { user_id: +userId },
    });

    if (data.length === 0) {
      return failCode(res, 'User does not exist!');
    } else {
      return successCode(res, 'Get like by user id successfully!', data);
    }
  } catch (error) {
    console.log(error);
    return errorCode(res);
  }
};

const getRateByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await models.user.findAll({
      include: 'res_rate_by_user',
      where: { user_id: +userId },
    });

    if (data.length === 0) {
      return failCode(res, 'User does not exist!');
    } else {
      return successCode(res, 'Get rate by user id successfully!', data);
    }
  } catch (error) {
    console.log(error);
    return errorCode(res);
  }
};

const orderFood = async (req, res) => {
  try {
    const { foodId, userId, amount = 1, code, arrSubId } = req.body;
    const orderCol = {
      food_id: +foodId,
      user_id: userId,
    };

    const foodExists = await models.food.findOne({
      where: { food_id: +foodId },
    });
    const userExists = await models.user.findOne({
      where: { user_id: userId },
    });

    if (foodExists && userExists) {
      const orderModel = {
        ...orderCol,
        ...(amount && { amount }),
        ...(code && { code }),
        ...(arrSubId && { arr_sub_id: arrSubId }),
      };

      const orderExists = await models.order.findOne({ where: orderCol });
      if (orderExists) {
        await models.order.update(
          {
            ...orderModel,
            ...(amount && { amount: orderExists.amount + amount }),
          },
          { where: orderCol }
        );
      } else {
        await models.order.create(orderModel);
      }
      return successCode(res, 'Order food successfully!');
    } else {
      return failCode(res, 'User or food does not exist!');
    }
  } catch (error) {
    console.log(error);
    return errorCode(res);
  }
};

module.exports = {
  getLikeByUserId,
  getRateByUserId,
  orderFood,
};

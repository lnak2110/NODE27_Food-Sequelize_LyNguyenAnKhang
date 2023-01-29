const dayjs = require('dayjs');
const { successCode, errorCode, failCode } = require('../config/response');
const models = require('../models');

const toggleLikeRestaurantById = async (req, res) => {
  let message = '';

  try {
    const { resId } = req.params;
    const { userId } = req.body;
    const likeResCol = {
      res_id: +resId,
      user_id: userId,
    };

    const resExists = await models.restaurant.findOne({
      where: { res_id: +resId },
    });
    const userExists = await models.user.findOne({
      where: { user_id: userId },
    });

    if (resExists && userExists) {
      const data = await models.like_res.findOne({
        where: likeResCol,
      });

      if (data) {
        await models.like_res.destroy({
          where: likeResCol,
        });
        message = 'Unlike restaurant successfully!';
      } else {
        await models.like_res.create(likeResCol);
        message = 'Like restaurant successfully!';
      }
      return successCode(res, message);
    } else {
      message = 'User or restaurant does not exist!';
      return failCode(res, message);
    }
  } catch (error) {
    console.log(error);
    return errorCode(res);
  }
};

const getLikeByRestaurantId = async (req, res) => {
  try {
    const { resId } = req.params;
    const data = await models.restaurant.findAll({
      include: 'user_like_res',
      where: { res_id: +resId },
    });

    if (data.length === 0) {
      return failCode(res, 'Restaurant does not exist!');
    } else {
      return successCode(res, 'Get like by restaurant id successfully!', data);
    }
  } catch (error) {
    console.log(error);
    return errorCode(res);
  }
};

const rateRestaurantById = async (req, res) => {
  try {
    const { resId } = req.params;
    const { userId, amount } = req.body;
    const rateResCol = {
      res_id: +resId,
      user_id: userId,
    };

    const resExists = await models.restaurant.findOne({
      where: { res_id: +resId },
    });
    const userExists = await models.user.findOne({
      where: { user_id: userId },
    });

    if (resExists && userExists) {
      const rateResModel = {
        ...rateResCol,
        amount,
      };
      const data = await models.rate_res.findOne({
        where: rateResCol,
      });

      if (data) {
        await models.rate_res.update(
          {
            ...rateResModel,
            date_rate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            where: rateResCol,
          }
        );
      } else {
        await models.rate_res.create(rateResModel);
      }
      return successCode(res, 'Rate restaurant successfully!');
    } else {
      return failCode(res, 'User or restaurant does not exist!');
    }
  } catch (error) {
    console.log(error);
    return errorCode(res);
  }
};

const getRateByRestaurantId = async (req, res) => {
  try {
    const { resId } = req.params;
    const data = await models.restaurant.findAll({
      include: 'user_rate_res',
      where: { res_id: +resId },
    });

    if (data.length === 0) {
      return failCode(res, 'Restaurant does not exist!');
    } else {
      return successCode(res, 'Get rate by restaurant id successfully!', data);
    }
  } catch (error) {
    console.log(error);
    return errorCode(res);
  }
};

module.exports = {
  toggleLikeRestaurantById,
  getLikeByRestaurantId,
  rateRestaurantById,
  getRateByRestaurantId,
};

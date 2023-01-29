// 200
const successCode = (res, message, data) => {
  if (data) {
    return res.status(200).json({
      message,
      content: data,
    });
  } else {
    return res.status(200).json({
      message,
    });
  }
};

// 400
const failCode = (res, message) => {
  return res.status(400).json({
    message,
  });
};

// 500
const errorCode = (res, message = 'Server error!') => {
  return res.status(500).json({
    message,
  });
};

module.exports = {
  successCode,
  failCode,
  errorCode,
};

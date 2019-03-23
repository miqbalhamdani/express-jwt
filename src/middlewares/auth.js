const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config.js');

const authentication = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    jwt.verify(token, secretKey, function(err, decoded) {
      if (err) {
        res.status(400).json(err);
      }else{
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    res.status(400).json({messsage: 'malformed request', error: `${error}`});
  }
};

module.exports = {
  authentication,
};
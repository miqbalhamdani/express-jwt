const jwt = require('jsonwebtoken');

const userValidate = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    const secret = req.app.get('secretKey');

    jwt.verify(token, secret, function(err, decoded) {
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
  userValidate,
};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10;

const { User } = require('../models');

const create = async (req, res) => {
  try {
    const attributes = {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
    }

    const result = await User.create(attributes);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({messsage: 'malformed request', error: `${error}`});
  }
};

const authenticate = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ where: {email: email} });

    if (!user) {
      res.status(status.HTTP_STATUS.NOT_FOUND).json({ message: 'User not found !'});
    }

    if(bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {id: user.id, name: user.name, email: user.email},
        req.app.get('secretKey'),
        { expiresIn: '1h' }
      );

      res.status(200).json({user: user, token:token});
    }else{
      res.status(400).json({status:"error", message: "Invalid email or password!"});
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({messsage: 'malformed request', error: `${error}`});
  }
};

module.exports = {
  create,
  authenticate,
};

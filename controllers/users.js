const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const NotFoundError = require('../Errors/NotFoundError');
const UnauthorizedError = require('../Errors/UnauthorizedError');

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь не найдена');
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, password, email,
  } = req.body;
  const passwordHash = bcryptjs.hashSync(password);
  User.create({
    name, about, avatar, email, password: passwordHash,
  })
    .then((user) => {
      const userP = user.toObject();
      delete userP.password;
      res.send({ data: userP });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about, avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) {
        throw new UnauthorizedError('Пользователь не найдена');
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь не найдена');
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (user == null) {
        throw new UnauthorizedError('Пользователь не найден');
      }

      if (bcryptjs.compareSync(password, user.password) === false) {
        throw new UnauthorizedError('Неверный логин/пароль');
      }

      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '1w' },
      );
      console.log(process.env.JWT_SECRET);

      res.status(200).send({ jwt: token });
    })
    .catch(next);
};

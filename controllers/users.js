const User = require('../models/userSchema');

module.exports.getUsers = (req, res) => {
  User.find()
    .then((users) => res.send(users));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.send({ data: user });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  if (name === undefined) {
    res.status(400).send({ message: 'Поле name должно быть заполнено' });
    return;
  }
  if (about === undefined) {
    res.status(400).send({ message: 'Поле about должно быть заполнено' });
    return;
  }
  if (avatar === undefined) {
    res.status(400).send({ message: 'Поле avatar должно быть заполнено' });
    return;
  }
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(req.params.id, { name, about, avatar })
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.send({ data: user });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.params.id, { avatar })
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.send({ data: user });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

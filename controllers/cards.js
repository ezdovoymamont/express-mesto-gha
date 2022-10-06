const Card = require('../models/cardSchema');

module.exports.getCards = (req, res) => {
  Card.find()
    .then((cards) => res.send(cards));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  if (name === undefined) {
    res.status(400).send({ message: 'Поле name должно быть заполнено' });
    return;
  }
  if (link === undefined) {
    res.status(400).send({ message: 'Поле link должно быть заполнено' });
    return;
  }
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        res.status(400).send({ message: `Произошла ошибка валидации данных` })
        return;
      }
      res.status(500).send({ message: `Произошла ошибка` })
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.id)
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: 'Карточка не найдена' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if(err.name === 'CastError') {
        res.status(400).send({ message: `Произошла ошибка валидации данных` })
        return;
      }
      res.status(500).send({ message: `Произошла ошибка` })
    });
};

module.exports.addLike = (req, res) => {
  console.log(req.body.cardId);
  Card.findByIdAndUpdate(
    req.body.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: 'Карточка не найдена' });
      } else {
        res.send({ data: card });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.body.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: 'Карточка не найдена' });
      } else {
        res.send({ data: card });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

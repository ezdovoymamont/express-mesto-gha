const Card = require('../models/cardSchema');
const NotFoundError = require('../Errors/NotFoundError');
const ForbiddenError = require('../Errors/ForbiddenError');
const Error400 = require('../Errors/Error400');

module.exports.getCards = (req, res, next) => {
  Card.find()
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError'
        || err.name === 'ValidationError') {
        next(new Error400('Произошла ошибка валидации данных'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findOne({ _id: req.params.id })
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (card.owner.equals(req.user._id) === false) {
        throw new ForbiddenError('Нельзя удалять не свою карточку');
      }
      Card.remove(card)
        .then(() => {
          res.send({ data: card });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ data: card });
    })
    .catch(next);
};

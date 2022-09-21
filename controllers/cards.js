const Card = require("../models/cardSchema");

module.exports.getCards = (req, res) => {
  Card.find()
    .then(cards => res.send(cards));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  if(name === undefined) {
    res.status(400).send({ message: 'Поле name должно быть заполнено' })
    return;
  }
  if(link === undefined) {
    res.status(400).send({ message: 'Поле link должно быть заполнено' })
    return;
  }
  const owner = req.user._id;
  Card.create({name, link, owner})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка'}));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req._id)
    .then(card => {
      if(card === null){
        res.status(404).send({ message: 'Карточка не найдена' });
      }
      else{
        res.send({ data: card });
      }
    })
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .then(card => {
    if(card === null){
      res.status(404).send({ message: 'Карточка не найдена' });
    }
    else{
      res.send({ data: card });
    }
  })
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then(card => {
    if(card === null){
      res.status(404).send({ message: 'Карточка не найдена' });
    }
    else{
      res.send({ data: card });
    }
  })
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

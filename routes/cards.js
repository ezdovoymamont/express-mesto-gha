const express = require('express');
const {
  celebrate,
  Joi,
} = require('celebrate');
const {
  getCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');
// eslint-disable-next-line prefer-regex-literals
const linkPattern = new RegExp('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$');

const router = express.Router();

router.get('/', getCards);
router.delete(
  '/:id',
  celebrate({
    params: Joi.object()
      .keys({
        id: Joi.string().length(24).hex().required(),
      }),
  }),
  deleteCard,
);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(linkPattern).required().min(1),
  }),
}), createCard);
router.put('/:id/likes', celebrate({
  params: Joi.object()
    .keys({
      id: Joi.string().length(24).hex().required(),
    }),
}), addLike);
router.delete('/:id/likes', celebrate({
  params: Joi.object()
    .keys({
      id: Joi.string().length(24).hex().required(),
    }),
}), removeLike);

module.exports = router;

const express = require('express');
const {
  celebrate,
  Joi,
} = require('celebrate');
const {
  getUsers, getUser, updateUser, updateAvatar,
} = require('../controllers/users');
const linkPattern = require('../app');

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getUser);
router.get(
  '/:id',
  celebrate({
    params: Joi.object()
      .keys({
        id: Joi.string()
          .required()
          .length(24),
      }),
  }),
  getUser,
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string()
          .required()
          .min(2)
          .max(30),
        about: Joi.string()
          .required()
          .min(2)
          .max(30),
      }),
  }),
  updateUser,
);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(linkPattern).min(2).max(30),
  }),
}), updateAvatar);

module.exports = router;

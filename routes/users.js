const express = require('express');
const {
  celebrate,
  Joi,
} = require('celebrate');
const {
  getUsers, getUser, updateUser, updateAvatar,
} = require('../controllers/users');
// eslint-disable-next-line prefer-regex-literals
const linkPattern = new RegExp('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$');

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

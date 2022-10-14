const express = require('express');
const {
  celebrate,
  Joi,
} = require('celebrate');
const {
  getUsers, getUser, updateUser, updateAvatar,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getUser);
router.get(
  '/:id',
  celebrate({
    params: Joi.object()
      .keys({
        id: Joi.string().length(24).hex().required(),
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
    avatar: Joi.string().pattern(/https?:\/\/(www\.)?[a-zA-Z\d\-.]{1,}\.[a-z]{1,6}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]*)/),
  }),
}), updateAvatar);

module.exports = router;

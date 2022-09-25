const express = require('express');
const {
  getUsers, getUser, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;

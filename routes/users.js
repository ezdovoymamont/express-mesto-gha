const { getUsers, getUser, createUser, updateUser, updateAvatar} = require('../controllers/users');
//const router = require("../router");
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
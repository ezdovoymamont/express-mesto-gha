const { getCards, createCard, deleteCard, addLike, removeLike} = require('../controllers/cards');
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

router.get('/', getCards);
router.delete('/:id', deleteCard);
router.post('/', createCard);
router.put('/', addLike);
router.delete('/', removeLike);

module.exports = router;
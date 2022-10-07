const express = require('express');
const {
  getCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');

const router = express.Router();

router.get('/', getCards);
router.delete('/:id', deleteCard);
router.post('/', createCard);
router.put('/:id/likes', addLike);
router.delete('/:id/likes', removeLike);

module.exports = router;

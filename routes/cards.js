const express = require('express');
const {
  getCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');

const router = express.Router();

router.get('/', getCards);
router.delete('/:id', deleteCard);
router.post('/', createCard);
router.put('/', addLike);
router.delete('/', removeLike);

module.exports = router;

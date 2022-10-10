require('dotenv').config();
const { connect } = require('mongoose');
const express = require('express');
const { json } = require('express');
const {
  celebrate,
  Joi,
} = require('celebrate');
const { errors } = require('celebrate');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const middleJwt = require('./middlewares/auth');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
//  useCreateIndex: true,
//   useFindAndModify: false
});

const app = express();
app.use(json());

app.use('/users', middleJwt, users);
app.use('/cards', middleJwt, cards);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(2).max(30),
  }),
}), login);

// eslint-disable-next-line prefer-regex-literals
const emailPattern = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
// eslint-disable-next-line prefer-regex-literals
const linkPattern = new RegExp('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$');
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().pattern(linkPattern).required().min(2).max(30),
    email: Joi.string().pattern(emailPattern).required().min(2).max(30),
    password: Joi.string().required().min(2).max(30),
  }),
}), createUser);

const send404 = (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
};
app.all('*', send404);

app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.name === 'CastError'
    || err.name === 'ValidationError') {
    res.status(400).send({ message: 'Произошла ошибка валидации данных' });
    return;
  }
  if (err.code === 11000) {
    res.status(409).send({ message: 'Пользователь уже создан' });
    return;
  }
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: 'Произошла ошибка' });
});
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;

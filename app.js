require('dotenv').config();
const { connect } = require('mongoose');
const express = require('express');
const { json } = require('express');
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

app.use('/users', users, middleJwt);
app.use('/cards', cards, middleJwt);
app.post('/signin', login);
app.post('/signup', createUser);

const send404 = (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
};
app.all('*', send404);

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
  res.status(err.statusCode).send({ message: err.message });
});
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;

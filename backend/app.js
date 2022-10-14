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
const NotFoundError = require('./Errors/NotFoundError');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const { requestLogger, errorLogger } = require('./middlewares/logger');
// eslint-disable-next-line prefer-regex-literals
const linkPattern = new RegExp('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$');

connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
//  useCreateIndex: true,
//   useFindAndModify: false
});

const allowedCors = [
  'http://garry.students.nomoredomains.icu/',
  'https://garry.students.nomoredomains.icu/',
  'localhost:3000'
];


const app = express();
app.use(json());
app.use(requestLogger);

app.use(function(req, res, next) {
  console.log('CORS');
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  console.log(method);
  const requestHeaders = req.headers['access-control-request-headers'];
  console.log(requestHeaders);

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', requestHeaders);
    return res.end();
  }

  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  console.log(origin);
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

app.use('/users', middleJwt, users);
app.use('/cards', middleJwt, cards);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkPattern),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

// eslint-disable-next-line no-unused-vars
const send404 = (req, res) => {
  throw new NotFoundError('Страница не найдена');
};
app.all('*', middleJwt, send404);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: 'Произошла ошибка' });
  next();
});
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

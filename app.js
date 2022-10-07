const { connect } = require('mongoose');
const express = require('express');
const { json } = require('express');
const users = require('./routes/users');
const cards = require('./routes/cards');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
//  useCreateIndex: true,
//   useFindAndModify: false
});

const app = express();
app.use(json());
app.use((req, res, next) => {
  req.user = {
    _id: '633df63a6d6895f039b98009', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});
app.use('/users', users);
app.use('/cards', cards);

const send404 = (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
};
app.all('*', send404);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

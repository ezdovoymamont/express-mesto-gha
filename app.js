const mongoose = require('mongoose');
const express = require('express');
const User = require('./models/userSchema');
const Card = require('./models/cardSchema');
const users = require("./routes/users");
const cards = require("./routes/cards");
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
//  useCreateIndex: true,
 //   useFindAndModify: false
});


const app = express();
app.use(express.json());
app.use('/users', users);
app.use('/cards', cards);

// app.get('/users', (req, res) => {
//    User.find()
//      .then(users => res.send(users));
// });
//
// app.get('/users/:id', (req, res) => {
//   User.findById(req.params.id)
//     .then(user => res.send({ data: user }))
//     .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
// });

// app.post('/users', (req, res) => {
//   const { name, about, avatar } = req.body;
//
//   User.create({ name, about, avatar })
//     .then(user => res.send({ data: user }))
//     .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
// });
//
// app.use((req, res, next) => {
//   req.user = {
//     _id: '6324f2ef7acbb8bfba032ae1' // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };
//
//   next();
// });



app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})
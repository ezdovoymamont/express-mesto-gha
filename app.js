import { connect } from 'mongoose';
import express, { json } from 'express';
import users from './routes/users';
import cards from './routes/cards';
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
//  useCreateIndex: true,
//   useFindAndModify: false
});

const app = express();
app.use(json());
app.use('/users', users);
app.use('/cards', cards);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
});
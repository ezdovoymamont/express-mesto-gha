const jwt = require('jsonwebtoken');

const middleJwt = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  if(req.headers.authorization === undefined)
  {
    res.status(401).send({ message: 'Ошибка сессии' });
    return;
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(
    token,
    NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    {},
    (err, payload) => {
      if (err) {
        res.status(401).send({ message: 'Ошибка сессии' });
      }
      req.user = payload;
      next();
    },
  );
};
module.exports = middleJwt;

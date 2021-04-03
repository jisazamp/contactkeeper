const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Conseguir el token desde el header
  const token = req.header('x-auth-token');

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'El token no es válido' });
  }
};

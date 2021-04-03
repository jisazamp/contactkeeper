const express = require('express');
const router = express.Router();

// @route   GET api/auth
// @desc    Devolver un usuario logueado
// @access  Private
router.get('/', (req, res) => {
  res.send('Devuelve un usuario logueado');
});

// @route   POST api/auth
// @desc    Autenticar un usuario y devolver el token
// @access  Public
router.post('/', (req, res) => {
  res.send('Loguear un usuario');
});

module.exports = router;

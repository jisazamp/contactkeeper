const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST api/users
// @desc    Registrar un usuario
// @access  Public
router.post(
  '/',
  body('name', 'Por favor incluya un nombre').not().isEmpty(),
  body(
    'email',
    'Por favor incluya una dirección de correo electrónico válida'
  ).isEmail(),
  body(
    'password',
    'Por favor ingrese una contraseña de 8 o más caracteres'
  ).isLength({ min: 8 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 400 significa Bad Request
      return res.status(400).json({ errors: errors.array() });
    }

    res.send(req.body);
  }
);

module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 400 significa Bad Request
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      // Método de Moongose para hayar una coincidencia
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'El usuario ya existe' });
      }

      // En este punto no se ha guardado en la BD, solo se ha creado la instancia
      user = new User({
        name,
        email,
        password,
      });

      // Cifrado del password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      res.send('El usuario se ha guardado');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Problema de servidor');
    }
  }
);

module.exports = router;

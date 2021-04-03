const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   GET api/auth
// @desc    Devolver un usuario logueado
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Devolver usuario desde la BD
    const user = await await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error de servidor');
  }
});

// @route   POST api/auth
// @desc    Autenticar un usuario y devolver el token
// @access  Public
router.post(
  '/',
  body(
    'email',
    'Por favor incluya una dirección de correo electrónico'
  ).isEmail(),
  body('password', 'Por favor digite su contraseña').isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 400 significa Bad Request
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Validar credenciales
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Credenciales inválidas' });
      }

      // Comparar los hashes
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Credenciales inválidas' });
      }

      // Conseguir el Token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(error.message);
      res.status(500).send('Error de servidor');
    }
  }
);

module.exports = router;

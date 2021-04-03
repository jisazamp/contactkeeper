const express = require('express');
const router = express.Router();
// Este es el middleware que usamos para proteger rutas
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    Devuelve los contactos de un usuario
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error de servidor');
  }
});

// @route   POST api/contacts
// @desc    Añadir nuevo contacto a un usuario
// @access  Private
router.post(
  '/',
  auth,
  body('name', 'Por favor incluya un nombre').not().isEmpty(),
  body(
    'email',
    'Por favor ingrese una dirección de correo electrónico'
  ).isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 400 significa Bad Request
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error de servidor');
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Actualizar contacto
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Actualiza un contacto');
});

// @route   DELETE api/contacts/:id
// @desc    Borra un contacto
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Borra un contacto');
});

module.exports = router;

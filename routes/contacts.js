const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Devuelve los contactos de un usuario
// @access  Private
router.get('/', (req, res) => {
  res.send('Devuelve contactos de un usuario');
});

// @route   POST api/contacts
// @desc    Añadir nuevo contacto a un usuario
// @access  Private
router.post('/', (req, res) => {
  res.send('Añade un nuevo contacto');
});

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

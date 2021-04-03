const express = require('express');
const router = express.Router();

// @route   POST api/users
// @desc    Registrar un usuario
// @access  Public
router.post('/', (req, res) => {
  res.send('Registra un usuario');
});

module.exports = router;

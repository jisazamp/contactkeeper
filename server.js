const express = require('express');

const app = express();

app.get('/', (req, res) =>
  res.json({ msg: 'Bienvenido a la aplicación de ContactKeeper API...' })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

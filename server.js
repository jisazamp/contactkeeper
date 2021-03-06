const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Conectar la base de datos
connectDB();

// Inicializar el Middleware, al hacer esto
// ya podemos aceptar body data
app.use(express.json({ extended: false }));

app.get('/', (req, res) =>
  res.json({ msg: 'Bienvenido a la aplicación de ContactKeeper API...' })
);

// Definiendo las rutas
app.use('/api/users', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

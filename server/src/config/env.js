require('dotenv').config();

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error('El puerto no está definido en las variables de entorno');
}

module.exports = { PORT };
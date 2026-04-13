// server/src/config/env.js
require('dotenv').config();

if (!process.env.PORT) {
  throw new Error('El puerto no está definido en las variables de entorno');
}

module.exports = {
  PORT: process.env.PORT,
};
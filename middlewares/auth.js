// Importamos dotenv para poder leer las variables del archivo .env
require('dotenv').config();

// Esta función es un middleware — se ejecuta ANTES de que llegue la petición al endpoint
// Express le pasa 3 parámetros: req (petición), res (respuesta), next (continuar)
const verificarPassword = (req, res, next) => {

  // Leemos el header "password" que debe enviar el cliente en cada petición
  // req.headers contiene todos los headers que llegaron con la petición
    const passwordEnviada = req.headers['password'];

  // Leemos la contraseña correcta desde las variables de entorno (.env)
  // Nunca escribimos la contraseña directamente en el código
    const passwordCorrecta = process.env.API_PASSWORD;

  // Si no enviaron el header o la contraseña está vacía
    if (!passwordEnviada) {
    // Respondemos con código 401 (No autorizado)
    return res.status(401).json({
        success: false,
        message: 'Acceso denegado — debes enviar el header password'
    });
    }

  // Si enviaron una contraseña pero no coincide con la del .env
    if (passwordEnviada !== passwordCorrecta) {
    // Respondemos con código 403 (Prohibido)
    return res.status(403).json({
        success: false,
        message: 'Contraseña incorrecta'
    });
    }

  // Si llegamos hasta acá, la contraseña es correcta
  // next() le dice a Express que puede continuar hacia el endpoint
    next();
};

// Exportamos el middleware para usarlo en index.js
module.exports = verificarPassword;
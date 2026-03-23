// Importamos dotenv para cargar las variables del archivo .env
// esto debe ir primero antes que cualquier otra cosa
require('dotenv').config();

// Importamos Express para crear el servidor
const express = require('express');

// Importamos CORS para permitir que el frontend se comunique con la API
// sin CORS el navegador bloquea las peticiones entre dominios diferentes
const cors = require('cors');

// Importamos path para manejar rutas de archivos
const path = require('path');

// Importamos la conexión a la base de datos
// al importarla se ejecuta el archivo db.js y se crean las tablas
const db = require('./db/db');

// Importamos el middleware de autenticación
const verificarPassword = require('./middlewares/auth');

// Importamos todas las rutas del proyecto
const estudiantesRutas     = require('./routes/estudiantesRutas');
const profesoresRutas      = require('./routes/profesoresRutas');
const cursosRutas          = require('./routes/cursosRutas');
const inscripcionesRutas   = require('./routes/inscripcionesRutas');
const notasRutas           = require('./routes/notasRutas');
const usuariosRutas        = require('./routes/usuariosRutas');
const materiasRutas        = require('./routes/materiasRutas');

// Creamos la aplicación de Express
const app = express();

// ── MIDDLEWARES GLOBALES ───────────────────────────────────────────────

// Habilitamos CORS para que el frontend pueda hacer peticiones a la API
app.use(cors());

// Habilitamos el parsing de JSON — sin esto req.body llega undefined
app.use(express.json());


// ── MIDDLEWARE DE AUTENTICACIÓN ────────────────────────────────────────

// Aplicamos el middleware de autenticación a todas las rutas que empiecen con /api
// esto protege todos los endpoints sin tener que repetirlo en cada ruta
app.use('/api', verificarPassword);

// ── RUTAS DE LA API ────────────────────────────────────────────────────

// Registramos cada router con su prefijo correspondiente
// todas las rutas de estudiantes quedan bajo /api/estudiantes
app.use('/api/estudiantes',   estudiantesRutas);

// todas las rutas de profesores quedan bajo /api/profesores
app.use('/api/profesores',    profesoresRutas);

// todas las rutas de cursos quedan bajo /api/cursos
app.use('/api/cursos',        cursosRutas);

// todas las rutas de inscripciones quedan bajo /api/inscripciones
app.use('/api/inscripciones', inscripcionesRutas);

// todas las rutas de notas quedan bajo /api/notas
app.use('/api/notas',         notasRutas);

// rutas de usuarios quedan bajo /api/usuarios 
app.use('/api/usuarios', usuariosRutas);
app.use('/api/materias', materiasRutas);

// ── RUTA RAÍZ ─────────────────────────────────────────────────────────



// ── RUTA 404 ───────────────────────────────────────────────────────────

// Si ninguna ruta anterior coincidió respondemos con 404
// el * captura cualquier ruta que no haya sido definida arriba
app.use('*splat', (req, res) => {
    res.status(404).json({
    success: false,
    message: `La ruta ${req.originalUrl} no existe en esta API`
    });
});

// ── INICIAR SERVIDOR ───────────────────────────────────────────────────

// Leemos el puerto desde las variables de entorno
// si no existe usamos 3000 como valor por defecto
const PORT = process.env.PORT || 3000;

// Ponemos el servidor a escuchar en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
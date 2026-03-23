// ── CONFIGURACIÓN INICIAL ──────────────────────────────────────────────

// Cargamos variables de entorno (.env)
require('dotenv').config();

// Importamos dependencias
const express = require('express');
const cors = require('cors');

// Importamos conexión DB (se ejecuta y crea tablas)
require('./db/db');

// Middleware de autenticación
const verificarPassword = require('./middlewares/auth');

// Rutas
const estudiantesRutas     = require('./routes/estudiantesRutas');
const profesoresRutas      = require('./routes/profesoresRutas');
const cursosRutas          = require('./routes/cursosRutas');
const inscripcionesRutas   = require('./routes/inscripcionesRutas');
const notasRutas           = require('./routes/notasRutas');
const usuariosRutas        = require('./routes/usuariosRutas');
const materiasRutas        = require('./routes/materiasRutas');

// Creamos app
const app = express();


// ── MIDDLEWARES GLOBALES ──────────────────────────────────────────────

// Permitir peticiones externas
app.use(cors());

// Permitir JSON en req.body
app.use(express.json());


// ── AUTENTICACIÓN GLOBAL ──────────────────────────────────────────────

// Protegemos todas las rutas bajo /api
app.use('/api', verificarPassword);


// ── RUTAS ─────────────────────────────────────────────────────────────

app.use('/api/estudiantes',   estudiantesRutas);
app.use('/api/profesores',    profesoresRutas);
app.use('/api/cursos',        cursosRutas);
app.use('/api/inscripciones', inscripcionesRutas);
app.use('/api/notas',         notasRutas);
app.use('/api/usuarios',      usuariosRutas);
app.use('/api/materias',      materiasRutas);


// ── RUTA 404 ──────────────────────────────────────────────────────────

// Captura cualquier ruta no definida
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `La ruta ${req.originalUrl} no existe`
  });
});


// ── MIDDLEWARE DE ERRORES (ANTES DEL LISTEN) ──────────────────────────

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Error interno del servidor"
  });
});


// ── INICIAR SERVIDOR ──────────────────────────────────────────────────

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
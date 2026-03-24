// Cargamos variables de entorno (.env) 
require('dotenv').config(); 
const express = require('express'); 
const cors = require('cors'); 
require('./db/db'); 
const verificarPassword = require('./middlewares/auth'); 
const estudiantesRutas = require('./routes/estudiantesRutas'); 
const profesoresRutas = require('./routes/profesoresRutas'); 
const cursosRutas = require('./routes/cursosRutas'); 
const inscripcionesRutas = require('./routes/inscripcionesRutas'); 
const notasRutas = require('./routes/notasRutas'); 
const usuariosRutas = require('./routes/usuariosRutas'); 
const materiasRutas = require('./routes/materiasRutas'); 
const app = express(); 
app.use(cors()); 
app.use(express.json()); 
app.get("/", (req, res) => {
  res.json({
    status: "API funcionando",
    author: "Miguel Montalvo"
  });
});  
app.use('/api', verificarPassword); 
app.use('/api/estudiantes', estudiantesRutas); 
app.use('/api/profesores', profesoresRutas); 
app.use('/api/cursos', cursosRutas); 
app.use('/api/inscripciones', inscripcionesRutas); 
app.use('/api/notas', notasRutas); 
app.use('/api/usuarios', usuariosRutas); 
app.use('/api/materias', materiasRutas); 
app.use('/{*splat}', (req, res) => { res.status(404).json({ success: false, message: `La ruta ${req.originalUrl} no existe` }); }); 
app.use((err, req, res, next) => { console.error(err); res.status(err.status || 500).json({ success: false, message: err.message || 'Error interno del servidor' }); }); 
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => { console.log(`Servidor corriendo en puerto ${PORT}`); }); 


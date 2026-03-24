// ── CLASE DE ERROR PERSONALIZADA ───────────────────────────────

class AppError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}


// ── HELPERS DE ERRORES COMUNES ───────────────────────────────

const notFound = (mensaje = "Recurso no encontrado") => {
  return new AppError(mensaje, 404);
};

const badRequest = (mensaje = "Datos inválidos") => {
  return new AppError(mensaje, 400);
};


module.exports = {
  AppError,
  notFound,
  badRequest
};
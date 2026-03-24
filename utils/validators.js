// ── IMPORTAMOS ERRORES ─────────────────────────────
const { notFound, badRequest } = require('./errors');


// ── VALIDAR QUE EXISTA UN REGISTRO ────────────────
const existeOError = (data, mensaje = "Recurso no encontrado") => {
  if (!data) throw notFound(mensaje);
  return data;
};


// ── VALIDAR CAMPOS OBLIGATORIOS ───────────────────
const camposRequeridos = (obj, campos = []) => {

  for (let campo of campos) {
    if (
      obj[campo] === undefined ||
      obj[campo] === null ||
      obj[campo] === ""
    ) {
      throw badRequest(`El campo ${campo} es obligatorio`);
    }
  }
};


// ── VALIDAR NÚMEROS ───────────────────────────────
const esNumero = (valor, nombre = "valor") => {
  if (isNaN(valor)) {
    throw badRequest(`El campo ${nombre} debe ser un número válido`);
  }
};


// ── VALIDAR NÚMERO POSITIVO ───────────────────────
const numeroPositivo = (valor, nombre = "valor") => {
  if (isNaN(valor) || Number(valor) <= 0) {
    throw badRequest(`El campo ${nombre} debe ser mayor a 0`);
  }
};


module.exports = {
  existeOError,
  camposRequeridos,
  esNumero,
  numeroPositivo
};
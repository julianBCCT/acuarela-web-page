const moment = require('moment');

// Valida si el campo tiene el formatado de una fecha valida.
const isDate = (value) => {
  if (!value) return false;

  const fecha = moment(value);

  if (fecha.isValid()) return true;
  else return false;
};

module.exports = { isDate: isDate };
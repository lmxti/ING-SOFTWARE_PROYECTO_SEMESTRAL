"use strict";

  /**
   * Manejador de errores
   * @param {Object} error Objecto con las especificaciones del error
   * @param {String} msg Mensaje para dar contexto al error
   */
  function handleError(error, msg) {
    console.log("[ERROR] A ocurrido un error en: \n", msg);
    console.error(error.message);
  }
  
  module.exports = {
    handleFatalError,
    handleError,
  };
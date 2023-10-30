const Grant = require('../models/grant.model');
const { handleError } = require("../utils/errorHandler");
const cron = require('node-cron');

// <-------------------------------------------------------------------->
/**
 * @name getGrants
 * @description Obtiene todos las becas de la base de datos
 * @returns {Promise} Promesa con el objeto de las becas de la base de datos
 */
async function getGrants() {
    try{
        const grants = await Grant.find().exec();
        if (!grants) {
            return [null, "No hay becas en la base de datos"];
        }
        return [grants, null];
    } catch(error) {
        handleError(error, "grant.service -> getGrants");
    }
}

// <-------------------------------------------------------------------->
/**
 * @name getGrantById
 * @description Servicio que se encarga deBusca una beca por su id
 * @param {String} id Id de la beca a buscar
 * @returns {Promise} Promesa con el objeto de la beca de la base de datos
 */
async function getGrantById(id) {
    try {
        // Busqueda de beca por id en la base de datos
        const grant = await Grant.findById({_id : id}).exec();
        // Verificacion de existencia de la beca
        if (!grant) {
            return [null, "No se encontró la beca"];
        }
        // Retorno de la beca encontrada
        return [grant, null];
    } catch (error) {
        handleError(error, "grant.service -> getGrantById");
    }
}

// <-------------------------------------------------------------------->
/**
 * @name createGrant
 * @description Servicio que se encarga de crear una beca
 * @param {Object} grant - Objeto con los datos de la beca a crear 
 * @returns {Promise} Promesa con el objeto de la beca creada
 */
async function createGrant(grant){
    try{
        // Desestructuracion de los datos de la beca a crear
        const { name, documents, amount, requirements } = grant;
        // Verificacion de existencia de la beca en la base de datos
        const grantFound = await Grant.findOne({ name: name });
        // Retorno de error si la beca ya existe
        if (grantFound) return [null, `No se pudo crear la beca, ya existe una con el nombre '${name}'`];


        const newGrant = new Grant({
            name,
            documents,
            amount,
            requirements
        })
        await newGrant.save();
        return [newGrant, null];
    } catch(error) {
        handleError(error, "grant.service -> createGrant");
    }
}

// <-------------------------------------------------------------------->
/**
 * @name updateGrant
 * @description Servicio que se encarga de actualizar una beca
 * @param {String} id - Id de la beca a actualizar
 * @param {Object} grant - Objeto con los datos de la beca a actualizar 
 * @returns 
 */
async function updateGrant(id, grant) {
    try {
        const grantFound = await Grant.findById(id);
        if (!grantFound) return [null, "No se encontró la beca"];
        const { name, documents, amount, requirements } = grant;

        const grantUpdated = await Grant.findByIdAndUpdate(
            id,
            {
                name,
                documents,
                amount,
                requirements,
            },
            { new: true },
        );
        return [grantUpdated, null];
    } catch (error) {
        handleError(error, "grant.service -> updateGrant");
    }
}
// <-------------------------------------------------------------------->
/**
 * @name deleteGrantById
 * @description Servicio que se encarga de eliminar una beca
 * @param {String} id - Id de la beca a eliminar 
 * @returns 
 */
async function deleteGrantById(id) {
    try {
        // Busqueda previa de la beca
        const grantFound = await Grant.findById(id);
        // Verificacion de existencia de la beca
        if (!grantFound) return [null, "No se encontró la beca"];
        // Eliminacion de beca
        const grantDeleted = await Grant.findByIdAndDelete(id);
        // Retorno de la beca eliminada
        return [grantDeleted, null];
    } catch (error) {
        handleError(error, "grant.service -> deleteGrant");
    }
}

// <-------------------------------------------------------------------->
/**
 * @name desactivateGrantById
 * @description Servicio que se encarga de desactivar una beca
 * @param {String} id - Id de la beca a desactivar 
 * @returns 
 */
async function desactivateGrantById(id) {
    try {
        const grantFound = await Grant.findById(id);
        if (!grantFound) return [null, "No se encontró la beca"];
        const grantDesactivated = await Grant.findByIdAndUpdate(id, {state: false});
        return [grantDesactivated, null];
    } catch (error) {
        handleError(error, "grant.service -> desactivateGrant");
    }
}

// <-------------------------------------------------------------------->
/**
 * @name checkGrant
 * @description Servicio que se encarga de verificar si una beca ya expiró
 * @returns 
 */
async function checkGrant() {
    try {
        const becas = await Grant.find({state: true});
        becas.forEach(async (beca) => {
        const fechaCreacion = beca.created_at;
  
        // Calcular la diferencia de tiempo en milisegundos
        const diferenciaTiempo = Date.now() - fechaCreacion.getTime();
        const diasTranscurridos = diferenciaTiempo / (1000 * 3600 * 24); // Convertir a días
  
        // Si han pasado 15 días desde la creación de la beca, se desactiva
        if (diasTranscurridos >= 15) {
          await desactivateGrantById(beca._id); // Desactivar la beca
        }
      });
    } catch (error) {
      console.error('Error al verificar las becas:', error);
    }
  }


// Programacion de la verificación cada día a la medianoche (00:00)
cron.schedule('0 0 * * *', () => {
    checkGrant();
  });

module.exports = {
    createGrant,
    getGrants,
    getGrantById,
    updateGrant,
    deleteGrantById,
    desactivateGrantById
}

const Grant = require('../models/grant.model');
const { handleError } = require("../utils/errorHandler");
const cron = require('node-cron');

/**
 * Obtiene todos las becas de la base de datos
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

async function getGrantById(id) {
    try {
        const grant = await Grant.findById({_id : id}).exec();
        if (!grant) {
            return [null, "No se encontró la beca"];
        }
        return [grant, null];
    } catch (error) {
        handleError(error, "grant.service -> getGrantById");
    }
}

async function createGrant(grant){
    try{
        const { name, documents, amount, requirements } = grant;
        const grantFound = await Grant.findOne({ name: name });
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
// NOTA: SUJETO A CAMBIOS, VERIFICAR SI UTILIZAR POR EL TEMA DE REGISTROS QUE TENGAN DATOS ASOCIADOS A LA BECA
async function deleteGrantById(id) {
    try {
        const grantFound = await Grant.findById(id);
        if (!grantFound) return [null, "No se encontró la beca"];
        const grantDeleted = await Grant.findByIdAndDelete(id);
        return [grantDeleted, null];
    } catch (error) {
        handleError(error, "grant.service -> deleteGrant");
    }
}

//  AGREGAR FUNCION PARA DESACTIVAR BECA (CAMBIAR ESTADO A FALSE)
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


async function checkGrant() {
    try {
        const becas = await Grant.find({state: true});
        becas.forEach(async (beca) => {
        const fechaCreacion = beca.created_at;
  
        // Calcular la diferencia de tiempo en milisegundos
        const diferenciaTiempo = Date.now() - fechaCreacion.getTime();
        const diasTranscurridos = diferenciaTiempo / (1000 * 3600 * 24); // Convertir a días
  
        if (diasTranscurridos >= 15) {
          await desactivarBeca(beca._id); // Desactivar la beca
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

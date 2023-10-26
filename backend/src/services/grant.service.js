const Grant = require('../models/grant.model');
const { handleError } = require("../utils/errorHandler");

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

module.exports = {
    createGrant,
    getGrants,
    getGrantById,
    updateGrant,
    deleteGrantById
}

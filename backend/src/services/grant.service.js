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

async function createGrant(grant){
    try{
        const { name, documents, amount, requirements } = grant;
        const grantFound = await Grant.findOne({ name: name });
        if (grantFound) return [null, "La beca ya existe"];

        const newGrant = new Grant({
            name,
            documents,
            amount,
            requirements,
            state: true
        })
        await newGrant.save();
        return [newGrant, null];
    } catch(error) {
        handleError(error, "grant.service -> createGrant");
    }
}





module.exports = {
    getGrants,
    createGrant
}

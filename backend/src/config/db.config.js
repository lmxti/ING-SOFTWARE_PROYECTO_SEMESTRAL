// Modulo 'mongoose' para crear conexion a la base de datos
import { connect } from 'mongoose';

import { DB_URL } from './env.config.js';

// Opciones de configuracion de la conexion a la base de datos
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

/**
 *@name setupDB
 *@description Función que se encarga de conectar la base de datos
 *@returns {Promise<void>}
 *@throws {Error}
 */

 export async function setupDB() {
    try{
        await connect(DB_URL, options);
        console.log('=> Conexión exitosa a la base de datos');
    }catch(error){
        console.log('/configDB.js -> setupDB() -> error', error);
    }
 };
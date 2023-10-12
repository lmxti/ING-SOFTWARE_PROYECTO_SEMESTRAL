import {connect} from "mongoose";
import {DB_URL} from "./env.config.js";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
/**
 * @name setupDB
 * @description conexion base de datos
 * @returns {Promise<void>}
 * @throws {Error}
 */
export async function setupDB() {
    try {
        await connect(DB_URL, options);
        console.log("Se conecto a la base de datos");
    } catch (error) {
        console.log('/configDB.js -> setupDB');
    }
}
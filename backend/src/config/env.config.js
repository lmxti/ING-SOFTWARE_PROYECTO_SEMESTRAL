import { fileURLToPath } from 'node:url';
import path from 'node:path';
import dotenv from 'dotenv';
 
// Conversion de URL del archivo actual en una ruta de archivo
const __filename = fileURLToPath(import.meta.url);
// Obtencion de el directorio del archivo actual
const __dirname = path.dirname(__filename);
// Obtencion de la ruta del archivo .env
const envFilePath = path.resolve(__dirname, '.env');

// Carga de variables de entorno desde el archivo .env
dotenv.config({ path: envFilePath });

export const DB_URL = process.env.DB_URL;
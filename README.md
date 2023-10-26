# ING-SOFTWARE_PROYECTO_SEMESTRAL

[ING DE SOFTWARE] Proyecto Semestral, Becas Municipales

1. Se instalaron las dependencias: mongoose, dotenv y morgan
   -> Configuracion de dotenv para leer desde 'config/.env'
   -> Documentacion de mongoose: https://mongoosejs.com/ para crear 'Schemas' y 'Models'

# Por cada modelo se debera crear

1. Un archivo de modelo
2. Un archivo de controlador
3. Un archivo de servicio
4. Un archivo de validacion (schema)
5. Un archivo de rutas


# Archivo .env en 'config/.env'
- Debe tener lo siguiente:
   - PORT= `3000`
   - HOST= `localhost`
   - DB_URL= `url_de_la_base_de_datos`
   - ACCESS_JWT_SECRET="`secret`"
   - REFRESH_JWT_SECRET="`secret2`"
   - EMAIL=`email_de_gmail`
   - PASSWORD=`password_app_terceros_gmail`

### UPDATE 10.25

1. Se creo modelo de beca 'Grant' y sus respectivos archivos (controlador, servicio, schema y rutas)
2. Se creo el modelo de postulacion 'Application' (Faltan sus respectivos archivos: controlador, servicio, schema y rutas) y ademas se creo la constante 'status' que contiene los estados posibles para una postulacion.
3. Instalacion para uso futuro de dependencias: nodemailer, multer

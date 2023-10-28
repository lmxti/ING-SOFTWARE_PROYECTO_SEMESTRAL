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


### UPDATE 10.27
1. Se incorporo la funcion que desactiva una beca a traves de un ID
2. Se programo para que la funcion se ejecute cada medianoche si la diferencia entre la fecha de creacion de la beca y la fecha actual es de 15 o mas dias.


### UPDATE 10.28
1. Se incorporo codigo de "Felipe Burgos" que incluye los modelos,controladores,servicios y rutas sobre la revision de becas (reviewGrant)
2. Falta ajustar el codigo para que se adapte a lo anteriormente programado.
3. Se incorporo codigo de "Johan Rodriguez" que incluye los modelos,controladores,servicios y rutas sobre la revision de postulacion (appeal)
4. Se ajusto y adapto el codigo para que el sistema de Apelaciones Y CRUD basico funcionaran




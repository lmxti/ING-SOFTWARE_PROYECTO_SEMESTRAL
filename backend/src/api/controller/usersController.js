import Users from "../../models/users.js";

async function createUser(req,res){
    const{
        nombre,apellido,rut,genero,direccion,
        telefono,email,contraseña,cuentaBanco,
        fechaNacimiento
    } = req.body

    const newUser = new Users ({
        nombre,apellido,rut,genero,direccion,
        telefono,email,contraseña,cuentaBanco,
        fechaNacimiento
    })
    const userSaver=await newUser.save()
    res.status(201).json(userSaver)
    /*Poner caso contrario, que no se pueda crear*/

}
module.exports = {
    createUser
};
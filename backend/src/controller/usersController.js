import users from "../../models/users.js";
import Users from "../../models/users.js";

//Crear usuario
async function createUser(req,res){
    const{
        nombre,apellido,
        rut,genero,direccion,
        telefono,email,
        contraseña,cuentaBanco,
        fechaNacimiento
    } = req.body

    const newUser = new Users ({
        nombre,apellido,rut,genero,direccion,
        telefono,email,contraseña,cuentaBanco,
        fechaNacimiento
    })
    //Guardar usuario
    const userSaved=await newUser.save()
    res.status(201).send(userSaved)
}
//Eliminar usuario
async function deleteUser(req,res){
    const { userDel }  = req.params;
    await Users.findByIdAndDelete(userDel);
    return res.status(200).send
}
//Modificar usuario
async function updateUser(req,res){
    const userMod = await Users.findByIdAndUpdate(req.params.userMod, req.body);
    res.status(200).send(userMod)
}
//Obtener usuario
async function getUser(req,res){
    const userGet = await Users.findById(req.params.userGet)
    res.status(200).send(userGet)
}
module.exports = {
    createUser,
    deleteUser,
    updateUser,
    getUser,
};
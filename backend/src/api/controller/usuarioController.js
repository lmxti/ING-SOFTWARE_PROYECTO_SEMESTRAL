// Importamos los modelos a utilizar
import Usuario from '../../models/usuario.js';
import usuario from '../../models/usuario.js';

// Crear usuario
const crearUsuario = async (req, res) => {
    try {
        const { name, surname, rut, gender, address, phone, email, password, role, bankAccount, birthDate } = req.body;
        const nuevoUsuario = new usuario({
            name,
            surname,
            rut,
            gender,
            address,
            phone,
            email,
            password,
            role,
            bankAccount,
            birthDate
        });
        await nuevoUsuario.save();
        res.status(201).send(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Eliminar usuario
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioAEliminar = await usuario.findByIdAndDelete(id);
        if (usuarioAEliminar) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Obtener usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Actualizar usuario por ID
const actualizarUsuarioID = async (req, res) => {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );
    res.status(200).json(usuarioActualizado);
}

// Exportar controladores
export default {
    crearUsuario,
    eliminarUsuario,
    obtenerUsuarios,
    actualizarUsuarioID
}
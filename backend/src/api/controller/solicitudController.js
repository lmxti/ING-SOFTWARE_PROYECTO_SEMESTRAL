// Se importan los modelos que se van a utilizar
import Solicitud from "../../models/solicitud";
import Beca from "../../models/beca";
import Usuario from "../../models/usuario";

// Crear solicitud de beca
const crearSolicitud = async (req, res) => {
    try {
        const { usuario, beca, estado, fecha } = req.body;
        const nuevaSolicitud = new Solicitud({
        usuario,
        beca,
        estado,
        fecha,
        });
        await nuevaSolicitud.save();
        res.status(201).send(nuevaSolicitud);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Eliminar solicitud de beca
const eliminarSolicitud = async (req, res) => {
    try {
        const { id } = req.params;
        const solicitudAEliminar = await Solicitud.findByIdAndDelete(id);
        if (solicitudAEliminar) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Solicitud no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Exportar controladores
export default {
    crearSolicitud,
    eliminarSolicitud
}
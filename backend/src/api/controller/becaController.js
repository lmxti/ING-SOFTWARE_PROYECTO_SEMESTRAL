import Beca from '../../models/beca.js';

const crearBeca = async (req, res) => {
    try {
        const { name, requirement, documents, mount } = req.body;
        const nuevaBeca = new Beca({
            name,
            requirement,
            documents,
            mount
        });
        await nuevaBeca.save();
        res.status(201).send(nuevaBeca);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const eliminarBeca = async (req, res) => {
    try {
        const { id } = req.params;
        const becaAEliminar = await Beca.findByIdAndDelete(id);
        if (becaAEliminar) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Beca no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const obtenerBecas = async (req, res) => {
    try {
        const becas = await Beca.find();
        res.status(200).json(becas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const actualizarBecaID = async (req, res) => {
    const becaActualizada = await Beca.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );
    res.status(200).json(becaActualizada);
}

export default {
    crearBeca,
    eliminarBeca,
    obtenerBecas,
    actualizarBecaID
};
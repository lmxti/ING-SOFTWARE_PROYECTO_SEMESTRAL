const Notification = require('../models/Notification');

//Enviar notificación automatica que anuncie el inicio de las postulaciones a becas
export const sendNotificationInit = async (req, res) => {
    try {
        const notification = new Notification({
            title: 'Postulaciones a becas',
            description: 'Las postulaciones a becas se encuentran abiertas',
            status: 'Enviada',
            user: req.params.id,
        });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//Enviar notificación automatica que anuncie el cierre de las postulaciones a becas
export const sendNotificationEnd = async (req, res) => {
    try {
        const notification = new Notification({
            title: 'Postulaciones a becas',
            description: 'Las postulaciones a becas se encuentran cerradas',
            status: 'Enviada',
            user: req.params.id,
        });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//enviar notificaion de estado de la postulacion a beca (Aprobado, Rechazado, Apelar)
export const sendNotificationStatus = async (req, res) => {
    try {
        const notification = new Notification({
            title: 'Estado de postulación',
            description: 'Su postulación a beca ha sido ' + req.body.status,
            status: 'Enviada',
            user: req.params.id,
        });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//enviar notificacion de resultados apelación de postulacion a beca
export const sendNotificationAppeal = async (req, res) => {
    try {
        const notification = new Notification({
            title: 'Resultado de apelación',
            description: 'Su postulación a beca ha sido ' + req.body.status,
            status: 'Enviada',
            user: req.params.id,
        });
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
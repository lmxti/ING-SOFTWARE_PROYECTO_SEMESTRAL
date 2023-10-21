import Notification from '../models/notification.model';

//crear notificacion para un usuarios
export const createNotification = async (req, res) => {
    try {
        const notification = new Notification(req.body);
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
//obtencion de notificaciones a un usuario
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.params.id });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//editar notificacion ya guardada antes de ser enviada
export const updateNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (notification) {
            notification.title = req.body.title;
            notification.description = req.body.description;
            notification.status = req.body.status;
            const updatedNotification = await notification.save();
            res.status(200).json(updatedNotification);
        } else {
            res.status(404).json({ message: 'Notificacion no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}




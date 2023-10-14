import Application from '../../models/application.model.js';


// <----------------------------- CREATE APPLICATION ----------------------------->
export const createApplication = async (req, res) => {
    try{
        // Extracting data from request body values
        const { person_id, grant_id, documents } = req.body;
        // Create a new application object with the data from the request
        const newApplication = new Application({ person_id, grant_id, documents, state : "pendiente" });
        // Saving the new application in the database
        const applicationSaved = await newApplication.save();
        // code 201 is for created
        res.status(201).json(applicationSaved);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error al crear solicitud"});
    }
};

// <----------------------------- GET APPLICATIONS ----------------------------->
export const getApplications = async (req, res) => {
    try{
        // Getting all the applications from the database
        const applications = await Application.find();
        // code 200 is for ok
        res.status(200).json(applications);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error al obtener solicitudes"});
    }
};

// <----------------------------- GET APPLICATION BY ID ----------------------------->
export const getApplicationById = async (req, res) => {
    try {
        // Getting the id parameter from the request
        const { applicationId } = req.params;
        // Getting the application from the database
        const application = await Application.findById(applicationId);
        // code 200 is for ok
        res.status(200).json(application);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error al obtener solicitud"});
    }
};

// <----------------------------- UPDATE APPLICATION BY ID ----------------------------->
export const updateApplicationById = async (req, res) => {
    try {
        // Getting the id parameter from the request
        const { applicationId } = req.params;
        // Getting the data from the request body
        const application = req.body;
        // Finding the application by id and updating its data
        const applicationUpdated = await Application.findByIdAndUpdate(applicationId, application, {new: true});
        // code 200 is for ok
        res.status(200).json(applicationUpdated);
    } catch (error) {
        res.status(500).json({message: "Error al actualizar solicitud"});
    }
};

// <----------------------------- DELETE APPLICATION BY ID ----------------------------->
export const deleteApplicationById = async (req, res) => {
    try {
        // Getting the id parameter from the request
        const { applicationId } = req.params;
        // Deleting the application from the database
        await Application.findByIdAndDelete(applicationId);
        // code 204 is for no content
        res.status(204).json();
    } catch (error) {
        res.status(500).json({message: "Error al eliminar solicitud"});
    }
};


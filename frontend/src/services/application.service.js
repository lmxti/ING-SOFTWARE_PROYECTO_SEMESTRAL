import axios from "./root.service";

export const getApplications = async () => {
    try {
        return axios.get("/applications");
    } catch (error) {
        console.log('Error en application.service -> getApplications', error.message);
    }
};

export const createApplication = async (formData) => {
    try {
        return axios.post("/applications", formData);

    } catch (error) {
        console.log('Error en application.service -> createApplication', error.message);
    }
};

export const updateApplication = async (id, formData) => {
    try {
        return axios.put(`/applications/${id}`, formData);
    } catch (error) {
        console.log('Error en application.service -> updateApplication', error);
    }
}

import axios from "./root.service";


export const getGrants = async () => {
    try {
        return axios.get("/grants");
        
    } catch (error) {
        console.log('Error en grant.service -> getGrants', error.message);
    }
};

export const createGrant = async (grant) => {
    try {
        return axios.post("/grants", grant);

    } catch (error) {
        console.log('Error en grant.service -> createGrant', error.message);
    }
};

export const desactivateGrantByID = async (id) => {
    try {
        return axios.put(`/grants/desactivate/${id}`);
    } catch (error) {
        console.log('Error en grant.service -> desactivateGrant', error.message);
    }
};

export const activateGrantByID = async (id) => {
    try {
        return axios.put(`/grants/activate/${id}`);
    } catch (error) {
        console.log('Error en grant.service -> activateGrant', error.message);
    }
};

import axios from "./root.service";

export const register = async (registerCredentials) => {
    try {
        return axios.post("/persons", registerCredentials);
        
    } catch (error) {
        console.log('Error en person.service -> register', error.message);
    }
};

export const getPersonById = async (id) => {
    try {
        return axios.get(`/persons/${id}`);
    } catch (error) {
        console.log('Error en person.service -> getPersonById', error.message);
    }
};

export const getPersonsWithGrants = async () => {
    try {
        return axios.get(`/personGrants`);
    } catch (error) {
        console.log('Error en person.service -> getPersonsWithGrants', error.message);
    }
}